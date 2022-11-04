const hre = require("hardhat");

const main = async () => {
	const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
	const helloWorld = await HelloWorld.deploy("Initial message");

	await helloWorld.deployed();

	console.log(`HelloWorld contract deployed to ${helloWorld.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
