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
		const [owner, otherAccount] = await ethers.getSigners();

		const HelloWorld = await ethers.getContractFactory("HelloWorld");
		const helloWorld = await HelloWorld.deploy("Initial message");

		return {helloWorld, owner, otherAccount};
	}

	describe("Deployment", async () => {
		it("should set initial message", async () => {
			const {helloWorld} = await loadFixture(deployHelloWorldFixture);

			const expectedMessage = "Initial message";
			const actualMessage = await helloWorld.getMessage();

			assert(actualMessage === expectedMessage, "Initial message not set to proper value");
		});
	});

	describe("Set new message", async () => {
		describe("Successful cases", async () => {
			it("properly changes the message", async () => {
				const {helloWorld, owner} = await loadFixture(deployHelloWorldFixture);

				await helloWorld.connect(owner).setMessage("New message");
				const updatedMessage = await helloWorld.getMessage();

				assert(updatedMessage === "New message", "New message not set to proper value");
			});
			it("emits MessageChanged event", async () => {
				const {helloWorld, owner} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.connect(owner).setMessage("New message")).to.emit(helloWorld, "MessageChanged").withArgs("New message");
			});
		});

		describe("Failure cases", async () => {
			it("reverts when other account tries to change message", async () => {
				const {helloWorld, otherAccount} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.connect(otherAccount).setMessage("New message")).to.be.revertedWith("Caller must be the owner");
			});
			it("reverts when new message is empty", async () => {
				const {helloWorld, owner} = await loadFixture(deployHelloWorldFixture);

				await expect(helloWorld.connect(owner).setMessage("")).to.be.revertedWith("Empty string not allowed");
			});
		});
	});
});
