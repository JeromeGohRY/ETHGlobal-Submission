const hre = require('hardhat');

async function main() {
  // Replace with your actual ERC20 token address and betting duration in seconds
  const stakingTokenAddress = '0x74EEb65Fb630603E2e298a45f2cC61139594422A'; // Replace with your token address
  const bettingDuration = 3600; // 1 hour for example

  const EventBetting = await hre.ethers.getContractFactory('EventBetting');
  const eventBetting = await EventBetting.deploy(
    stakingTokenAddress,
    bettingDuration
  );

  await eventBetting.deployed();

  console.log('EventBetting deployed to:', eventBetting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
