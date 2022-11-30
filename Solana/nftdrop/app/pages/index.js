import React, { useEffect } from "react";
import CandyMachine from "../components/CandyMachine";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from 'next/dynamic';
import { useWallet } from "@solana/wallet-adapter-react";

// Constants

const WalletMultiButton = dynamic(
    async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Home = () => {

    const wallet = useWallet();

    useEffect (() => {
        console.log(wallet)
    }, [wallet]);

    const renderNotConnectedContainer = () => (

        <div>
            <img src="https://csharpcorner-mindcrackerinc.netdna-ssl.com/article/adding-a-loading-page-to-website/Images/chromecapture.gif" alt="emoji" />
            <div className="button-container">
                <WalletMultiButton className="cta-button connect-wallet-button" />
            </div>
        </div>
    );

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header">🍭 JP Programming Languages Logo Drop</p>
                    <p className="sub-text">Connect your wallet to devnet and get one of my NFT&apos;s.</p>
                    <p className="sub-text">The&apos;re are only 3 available</p>
                    <p className="sub-text">(they don&apos;t worth nothing, just for fun)</p>
                    {wallet.publicKey ? <CandyMachine walletAddress={wallet} /> : renderNotConnectedContainer()}
                </div>
                {/* <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
                    <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built on @${TWITTER_HANDLE}`}</a>
                </div> */}
            </div>
        </div>
    );
};

export default Home;