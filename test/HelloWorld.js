const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld unit tests", async () => {
	// Function acts like a "beforeEach"
	const deployHelloWorldFixture = async () => {
		const [owner] = await ethers.getSigners();

		const HelloWorld = await ethers.getContractFactory("HelloWorld");
		const helloWorld = await HelloWorld.deploy("Initial message");

		return {helloWorld, owner};
	}

	describe("Deployment", async () => {
		it("should set initial message", async () => {
			const {helloWorld} = await loadFixture(deployHelloWorldFixture);

			const expectedMessage = "Initial message";
			const actualMessage = await helloWorld.getMessage();

			assert(actualMessage === expectedMessage, "Initial message not set to proper value");
		});
	});

});
