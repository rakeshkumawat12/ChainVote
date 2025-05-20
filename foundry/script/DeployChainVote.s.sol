// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ChainVote} from "../src/ChainVote.sol";

contract ChainVoteScript is Script {
    ChainVote public chainVote;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        chainVote = new ChainVote();

        vm.stopBroadcast();
    }
}