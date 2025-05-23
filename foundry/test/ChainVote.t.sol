// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ChainVote.sol";

contract ChainVoteTest is Test {
    ChainVote public chainVote;
    address public ayush = address(0x1);
    address public om = address(0x2);
    address public carol = address(0x3);

    function setUp() public {
        chainVote = new ChainVote();
    }

    function testCreatePoll() public {
        string[] memory candidates = new string[](2);
        candidates[0] = "Rakesh";
        candidates[1] = "Suresh";

        vm.prank(ayush);
        chainVote.createPoll("Election 1", candidates, 1); // 1 min

        (string memory name, , uint256 endTime, , ) = chainVote.getPollDetails(
            0
        );
        assertEq(name, "Election 1");
        assertGt(endTime, block.timestamp);
    }

    function testVoteAndCheckWinner() public {
        string[] memory candidates = new string[](2);
        candidates[0] = "Rakesh";
        candidates[1] = "Suresh";

        vm.prank(ayush);
        chainVote.createPoll("Election 1", candidates, 1); // 1 min

        // om votes for candidate 0
        vm.prank(om);
        chainVote.vote(0, 0);

        bool hasVoted = chainVote.hasUserVoted(0, om);
        assertTrue(hasVoted);

        // Fast forward time
        vm.warp(block.timestamp + 61);
        (string memory winnerName, uint256 votes) = chainVote.getWinner(0);
        assertEq(winnerName, "Rakesh");
        assertEq(votes, 1);
    }

    function testCannotVoteTwice() public {
        string[] memory candidates = new string[](2);

        candidates[0] = "Rakesh";
        candidates[1] = "Suresh";

        vm.prank(ayush);
        chainVote.createPoll("Poll", candidates, 1);

        vm.prank(om);
        chainVote.vote(0, 0);

        vm.expectRevert("You have already voted");
        vm.prank(om);
        chainVote.vote(0, 1);
    }

    function testVoteFailsAfterEndTime() public {
        string[] memory candidates = new string[](2);

        candidates[0] = "A";
        candidates[1] = "B";

        vm.prank(ayush);
        chainVote.createPoll("Test", candidates, 1);

        // Forward past end time
        vm.warp(block.timestamp + 61);

        vm.expectRevert("Voting period is over");
        vm.prank(om);
        chainVote.vote(0, 1);
    }

    function testInvalidPollIdReverts() public {
        vm.expectRevert("Invalid poll ID");
        chainVote.getCandidates(1);

        vm.expectRevert("Invalid poll ID");
        chainVote.vote(99, 0);
    }

    function testInvalidCandidateIndexReverts() public {
        string[] memory candidates = new string[](1);

        candidates[0] = "OnlyOne";

        vm.prank(ayush);
        chainVote.createPoll("Solo", candidates, 1);

        vm.expectRevert("Invalid candidate index");
        vm.prank(om);
        chainVote.vote(0, 1);
    }

    function testGetPollsLength() public {
        string[] memory candidates = new string[](1);
        candidates[0] = "Rakesh";

        vm.prank(ayush);
        chainVote.createPoll("A", candidates, 1);
        assertEq(chainVote.getPollsLength(), 1);
    }

    function testGetAllPollsMetadata() public {
        string[] memory candidates = new string[](1);

        candidates[0] = "A";

        vm.prank(ayush);
        chainVote.createPoll("Poll1", candidates, 1);

        (
            string[] memory names,
            uint256[] memory startTimes,
            uint256[] memory endTimes,
            address[] memory creators
        ) = chainVote.getAllPollsMetadata();

        assertEq(names.length, 1);
        assertEq(names[0], "Poll1");
        assertEq(creators[0], ayush);
        assertGt(endTimes[0], startTimes[0]);
    }
}
