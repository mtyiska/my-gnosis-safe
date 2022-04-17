pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {
  string public purpose = "Building Unstoppable Apps!!!";
  uint256 public balance = address(this).balance;
  address public adr = address(this);

  // this is an error handler
  //error EmptyPurposeError(uint code, string message);

  constructor() {
    // what should we do on deploy?
    console.log("deployed");
  }

  receive() external payable {}

  function transferEther() public payable {
    (bool sent, ) = address(this).call{ value: msg.value }("");
    require(sent, "Failed to send Ether");
  }

  // this is an event for the function below
  event SetPurpose(address sender, string purpose);

  function setPurpose(string memory newPurpose) public {
    // you can add error handling!

    // if(bytes(newPurpose).length == 0){
    //     revert EmptyPurposeError({
    //         code: 1,
    //         message: "Purpose can not be empty"
    //     });
    // }

    purpose = newPurpose;
    console.log(msg.sender, "set purpose to", purpose);
    emit SetPurpose(msg.sender, purpose);
  }
}
