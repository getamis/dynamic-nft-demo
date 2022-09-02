// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DynamicNFT is Ownable, ERC721 {
    using Counters for Counters.Counter;

    string private _baseUri;
    string private _contractUri;
    Counters.Counter private _tokenIdTracker;

    constructor() ERC721("Dynamic NFT", "DNFT") {}

    function mint(address to)
        public
        virtual
        onlyOwner
        returns (uint256 tokenId)
    {
        tokenId = _tokenIdTracker.current();
        _safeMint(to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }

    function setBaseURI(string memory uri) public virtual onlyOwner {
        _baseUri = uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }

    function setContractURI(string memory uri) public virtual onlyOwner {
        _contractUri = uri;
    }

    function contractURI() public view returns (string memory) {
        return _contractUri;
    }
}
