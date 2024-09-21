const hre = require('hardhat');

async function main() {
  const stakingTokenAddress = '0xa4f0b7ba97cFB2fD31Ed31311844eea0786C4D81';
  // const stakingTokenAddress = '0x586EE5Df24c5a426e42eD7Ea6e3EB0f00a4a2256';
  const bettingDuration = 3600; // 1 hour for example

  const EventBetting = await hre.ethers.getContractFactory('EventBetting');
  const eventBetting = await EventBetting.deploy(
    stakingTokenAddress,
    bettingDuration
  );

  await eventBetting.waitForDeployment();
  const contractAddress = await eventBetting.getAddress(); // Retrieve the contract address

  console.log('EventBetting deployed to:', contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  //new contract address: 0x7c5377E00d483B0f7C6eB14C6a689578785Fd7E5