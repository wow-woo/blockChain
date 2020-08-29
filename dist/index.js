"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, hash, preHash, data, timeStamp) {
        this.index = index;
        this.hash = hash;
        this.preHash = preHash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
    static crypt(index, preHash, timeStamp, data) {
        const ha = index + preHash + timeStamp + data;
        // const ha = await hash(index + preHash + timeStamp + data);
        return ha;
    }
}
Block.validateStructure = (block) => {
    // const { index, hash, preHash, data, timeStamp } = block;
    if (typeof block.index === "number" &&
        typeof block.hash === "string" &&
        typeof block.preHash === "string" &&
        typeof block.data === "string" &&
        typeof block.timeStamp === "number") {
        return true;
    }
    else {
        return false;
    }
};
const block = new Block(0, "324242", " ", "hello", 1424);
let blockChain = [block];
const getBlockchain = () => blockChain;
const getLastBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const preBlock = getLastBlock();
    const newIndex = preBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.crypt(newIndex, preBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, preBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (block) => {
    return Block.crypt(block.index, block.preHash, block.timeStamp, block.data);
};
const validate = (preBlock, targetBlock) => {
    if (!Block.validateStructure(targetBlock)) {
        return false;
    }
    else if (preBlock.index + 1 !== targetBlock.index) {
        return false;
    }
    else if (preBlock.hash !== targetBlock.preHash) {
        return false;
    }
    else if (getHashForBlock(targetBlock) !== targetBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (targetBlock) => {
    if (validate(getLastBlock(), targetBlock)) {
        blockChain.push(targetBlock);
    }
};
createNewBlock("world1");
createNewBlock("world2");
createNewBlock("world3");
console.log(blockChain);
//# sourceMappingURL=index.js.map