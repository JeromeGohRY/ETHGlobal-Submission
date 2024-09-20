const hre = require('hardhat');

async function main() {
  const stakingTokenAddress = '0x74EEb65Fb630603E2e298a45f2cC61139594422A';
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
