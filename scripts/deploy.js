const hre = require("hardhat");

const sleep = async (ms) => {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, ms);
	});
}

const main = async () => {
	const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
	const helloWorld = await HelloWorld.deploy("Initial message");

	await helloWorld.deployed();

	console.log(`HelloWorld contract deployed to ${helloWorld.address}`);

	// Delay the Etherscan verification
	await sleep(30 * 1000);

	await hre.run("verify:verify", {
		address: helloWorld.address,
		constructorArguments: ["Initial message"],
	});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
