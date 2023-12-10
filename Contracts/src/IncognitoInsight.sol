// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {UltraVerifier} from "./Ecdsa.sol";

/// @title A contract for creating and verifying investment challenges
/// @notice This contract allows users to create investment challenges and get them verified
contract IncognitoInsight {
    UltraVerifier private verifier;

    error NotVerified();
    error StringTooLong();

    uint256 public challengeIdCount = 1;

    mapping(uint256 => bytes32[]) public challenges;

    // Events
    event ChallengeCreated(
        uint256 indexed challengeId,
        address indexed challenger,
        uint256 indexed expectedProfit
    );
    event ChallengeVerified(
        uint256 indexed challengeId,
        bool indexed verified,
        uint indexed solverNickname
    );

    /// @notice Constructor to set the stake amount
    constructor() {
        verifier = new UltraVerifier();
    }

    /// @notice Verifies a given challenge
    /// @param challengeId The ID of the challenge to be verified
    /// @param _proof The proof to be verified
    function getVerified(
        uint256 challengeId,
        bytes calldata _proof,
        uint solverNickname
    ) external returns (bool _verified) {
        bytes32[] memory challenge = challenges[challengeId];
        challenge[8] = (bytes32(solverNickname));
        try verifier.verify(_proof, challenge) returns (
            bool _verified
        ) {
            emit ChallengeVerified(challengeId, _verified, solverNickname);
            return _verified;
        } catch {
            revert NotVerified();
        }
    }

    /// @notice Creates a new challenge
    /// @param challengerAddress The address of the challenger
    /// @param expected_profit_percentage The expected profit percentage for the challenge
    /// @param holdings The holdings associated with the challenge
    /// @param platform The platform where the challenge is created
    function createChallenge(
        address challengerAddress,
        uint256 expected_profit_percentage,
        address[5] calldata holdings,
        address platform
    ) external {
        bytes32[] memory publicInputs = new bytes32[](9);
        publicInputs[0] = bytes32(uint256(uint160(challengerAddress)));
        publicInputs[1] = bytes32(uint256(uint160(platform)));
        publicInputs[2] = bytes32(uint256(uint160(holdings[0])));
        publicInputs[3] = bytes32(uint256(uint160(holdings[1])));
        publicInputs[4] = bytes32(uint256(uint160(holdings[2])));
        publicInputs[5] = bytes32(uint256(uint160(holdings[3])));
        publicInputs[6] = bytes32(uint256(uint160(holdings[4])));
        publicInputs[7] = bytes32(expected_profit_percentage);

        challenges[challengeIdCount] = publicInputs;
        emit ChallengeCreated(
            challengeIdCount,
            challengerAddress,
            expected_profit_percentage
        );
        ++challengeIdCount;
    }

    /// @notice Retrieves details for a specified challenge
    /// @param challengeId Unique identifier of the challenge
    /// @return challengerAddress Address of the challenger
    /// @return platform Platform address related to the challenge
    /// @return holdings Array of addresses representing holdings
    /// @return expected_profit_percentage Expected profit percentage of the challenge
    function getChallengeDetails(uint256 challengeId) 
        public 
        view 
        returns (
            address challengerAddress, 
            address platform, 
            address[5] memory holdings, 
            uint256 expected_profit_percentage
        ) 
    {
        require(challengeId < challengeIdCount, "Invalid challenge ID");
        bytes32[] memory publicInputs = challenges[challengeId];

        require(publicInputs.length == 9, "Invalid challenge data");

        challengerAddress = address(uint160(uint256(publicInputs[0])));
        platform = address(uint160(uint256(publicInputs[1])));
        for (uint i = 0; i < 5; i++) {
            holdings[i] = address(uint160(uint256(publicInputs[i + 2])));
        }
        expected_profit_percentage = uint256(publicInputs[7]);
    }

    /// @notice Converts a string to a bytes32 type
    /// @param source The string to be converted
    /// @return result The resulting bytes32 representation
    function stringToBytes32(string memory source)
        public
        pure
        returns (bytes32 result)
    {
        // Check that the string is not too long
        if (bytes(source).length > 32) revert StringTooLong();
        // Copy the string's bytes to the fixed-size array
        assembly {
            result := mload(add(source, 32))
        }
    }
}