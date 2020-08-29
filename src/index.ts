class Block {
  public index: number;
  public hash: string;
  public preHash: string;
  public data: string;
  public timeStamp: number;

  static crypt(
    index: number,
    preHash: string,
    timeStamp: number,
    data: string
  ): string {
    const ha = index + preHash + timeStamp + data;
    // const ha = await hash(index + preHash + timeStamp + data);
    return ha;
  }

  static validateStructure = (block: Block): boolean => {
    // const { index, hash, preHash, data, timeStamp } = block;
    if (
      typeof block.index === "number" &&
      typeof block.hash === "string" &&
      typeof block.preHash === "string" &&
      typeof block.data === "string" &&
      typeof block.timeStamp === "number"
    ) {
      return true;
    } else {
      return false;
    }
  };

  constructor(
    index: number,
    hash: string,
    preHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.preHash = preHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}

const block: Block = new Block(0, "324242", " ", "hello", 1424);

let blockChain: Block[] = [block];

const getBlockchain = (): Block[] => blockChain;
const getLastBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string) => {
  const preBlock: Block = getLastBlock();
  const newIndex: number = preBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.crypt(
    newIndex,
    preBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    preBlock.hash,
    data,
    newTimeStamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (block: Block): string => {
  return Block.crypt(block.index, block.preHash, block.timeStamp, block.data);
};

const validate = (preBlock: Block, targetBlock: Block): Boolean => {
  if (!Block.validateStructure(targetBlock)) {
    return false;
  } else if (preBlock.index + 1 !== targetBlock.index) {
    return false;
  } else if (preBlock.hash !== targetBlock.preHash) {
    return false;
  } else if (getHashForBlock(targetBlock) !== targetBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (targetBlock): void => {
  if (validate(getLastBlock(), targetBlock)) {
    blockChain.push(targetBlock);
  }
};

createNewBlock("world1");
createNewBlock("world2");
createNewBlock("world3");

console.log(blockChain);

export {};
