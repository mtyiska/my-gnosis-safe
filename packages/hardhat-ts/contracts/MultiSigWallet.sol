pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSigWalletContract {
  event WalletCreated(uint256 indexed eventId, string walletId, uint256 createdTime, uint256 numberOfOwners, address walletOwners, uint256 walletBalance);
  event Deposit(uint256 indexed eventId, address indexed sender, uint256 value, uint256 timeStamp);

  /**Counters */
  using Counters for Counters.Counter;
  using ECDSA for bytes32;
  Counters.Counter private _eventIds;

  uint256 public constant MAX_OWNER_COUNT = 10;
  uint256 public walletBalance;
  string public walletId;
  address public owner;
  mapping(address => bool) private owners;

  constructor() {
    // what should we do on deploy?
    console.log("deploying Multisig");
  }

  /**createWallet*/
  function createWallet(string memory _walletId, address _adr) public validRequirement(1, 1) {
    address _walletOwners = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    console.log("is address the same =>>", keccak256(abi.encodePacked(_adr)) == keccak256(abi.encodePacked(_walletOwners)));
    owners[_adr] = true;
    walletId = _walletId;
    owner = _adr;
    _eventIds.increment();

    emit WalletCreated(_eventIds.current(), walletId, block.timestamp, 1, owner, walletBalance);
  }

  /// @dev Fallback function allows to deposit ether.
  receive() external payable {
    if (msg.value > 0) {
      _eventIds.increment();
      emit Deposit(_eventIds.current(), msg.sender, msg.value, block.timestamp);
    }
  }

  function getContractAddress() public view returns (address) {
    return address(this);
  }

  function getContractBalance() public view returns (uint256) {
    return address(this).balance;
  }

  modifier validRequirement(uint256 ownerCount, uint256 _required) {
    require(ownerCount <= MAX_OWNER_COUNT && _required <= ownerCount && _required != 0 && ownerCount != 0);
    _;
  }
}
