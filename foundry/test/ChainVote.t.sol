// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChainVote} from "../src/ChainVote.sol";

contract ChainVoteTest is Test {
    ChainVote public chainVote;

    function setUp() public {
        chainVote = new ChainVote();
    }
}
