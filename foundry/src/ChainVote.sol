// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ChainVote {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Poll {
        string name;
        Candidate[] candidates;
        uint256 startTime;
        uint256 endTime;
        address creator;
        mapping(address => bool) hasVoted;
    }

    Poll[] public polls;

    event PollCreated(
        uint256 indexed pollId,
        string pollName,
        uint256 startTime,
        uint256 endTime
    );
    event Voted(
        uint256 indexed pollId,
        address indexed voter,
        uint256 indexed candidateIndex
    );

    function createPoll(
        string memory _pollName,
        string[] memory _candidateNames,
        uint256 _durationInMinutes
    ) external {
        Poll storage newPoll = polls.push();
        newPoll.name = _pollName;
        newPoll.startTime = block.timestamp;
        newPoll.endTime = block.timestamp + (_durationInMinutes * 1 minutes);
        newPoll.creator = msg.sender;

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            newPoll.candidates.push(
                Candidate({name: _candidateNames[i], voteCount: 0})
            );
        }

        emit PollCreated(
            polls.length - 1,
            _pollName,
            newPoll.startTime,
            newPoll.endTime
        );
    }

    function vote(uint256 _pollId, uint256 _candidateIndex) external {
        require(_pollId < polls.length, "Invalid poll ID");
        Poll storage poll = polls[_pollId];

        require(block.timestamp < poll.endTime, "Voting period is over");
        require(!poll.hasVoted[msg.sender], "You have already voted");
        require(
            _candidateIndex < poll.candidates.length,
            "Invalid candidate index"
        );

        poll.hasVoted[msg.sender] = true;
        poll.candidates[_candidateIndex].voteCount++;

        emit Voted(_pollId, msg.sender, _candidateIndex);
    }

    function getPollsLength() external view returns (uint256) {
        return polls.length;
    }

    function getCandidates(
        uint256 _pollId
    ) external view returns (Candidate[] memory) {
        require(_pollId < polls.length, "Invalid poll ID");

        // Create memory array for candidates
        Poll storage poll = polls[_pollId];
        Candidate[] memory candidatesList = new Candidate[](
            poll.candidates.length
        );
        for (uint256 i = 0; i < poll.candidates.length; i++) {
            candidatesList[i] = poll.candidates[i];
        }

        return candidatesList;
    }

    function getWinner(
        uint256 _pollId
    ) external view returns (string memory winnerName, uint256 winnerVotes) {
        require(_pollId < polls.length, "Invalid poll ID");
        Poll storage poll = polls[_pollId];
        require(block.timestamp >= poll.endTime, "Voting still in progress");

        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;

        for (uint256 i = 0; i < poll.candidates.length; i++) {
            if (poll.candidates[i].voteCount > maxVotes) {
                maxVotes = poll.candidates[i].voteCount;
                winnerIndex = i;
            }
        }

        winnerName = poll.candidates[winnerIndex].name;
        winnerVotes = poll.candidates[winnerIndex].voteCount;
    }

    function getPollDetails(
        uint256 _pollId
    )
        external
        view
        returns (
            string memory name,
            uint256 startTime,
            uint256 endTime,
            address creator,
            Candidate[] memory candidates
        )
    {
        require(_pollId < polls.length, "Invalid poll ID");
        Poll storage poll = polls[_pollId];

        // Create a memory array for candidates
        Candidate[] memory memoryCandidates = new Candidate[](
            poll.candidates.length
        );
        for (uint256 i = 0; i < poll.candidates.length; i++) {
            memoryCandidates[i] = poll.candidates[i];
        }

        return (
            poll.name,
            poll.startTime,
            poll.endTime,
            poll.creator,
            memoryCandidates
        );
    }

    function getAllPollsMetadata()
        external
        view
        returns (
            string[] memory names,
            uint256[] memory startTimes,
            uint256[] memory endTimes,
            address[] memory creators
        )
    {
        uint256 len = polls.length;
        names = new string[](len);
        startTimes = new uint256[](len);
        endTimes = new uint256[](len);
        creators = new address[](len);

        for (uint256 i = 0; i < len; i++) {
            names[i] = polls[i].name;
            startTimes[i] = polls[i].startTime;
            endTimes[i] = polls[i].endTime;
            creators[i] = polls[i].creator;
        }
    }

    function hasUserVoted(
        uint256 _pollId,
        address _user
    ) external view returns (bool) {
        require(_pollId < polls.length, "Invalid poll ID");
        return polls[_pollId].hasVoted[_user];
    }
}
