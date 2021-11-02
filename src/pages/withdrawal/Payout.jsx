import React from "react";
import { useMoralis } from "react-moralis";
import { Stack, Container, Button, Box, Text, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Payout = () => {
    const {wdid, id, amount, userwallet } = useParams();
    let tokenPrice = amount;

    // const mainDepositAddress = "0xa1f36CA9f777385e4665309B3A60B7462D287076";
    // const testDepositAddress = "0x6f4F884997E56268f1a3b23db5D298FC2DBA8420"
    const tokenContractAddress = "0xf7d5fe48d422c6c62736046e11bd5a5cdeb95a54"
    const { Moralis, authenticate, isAuthenticating, isAuthenticated, user, logout, isWeb3Enabled, enableWeb3 } = useMoralis();

    async function WalletAuthentication() {
        await authenticate({
            provider: "walletconnect",
            chainId: 56,
            // mobileLinks: ["metamask","trust","imtoken", "pillar"],
            signingMessage: "You Can Processed To Deposit"
        })

    }

    React.useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) {
            enableWeb3({
                provider: "walletconnect",
                chainId: 56
            })
        }
    }, [isWeb3Enabled, isAuthenticated, enableWeb3]);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
        }
    })
    async function Transfer() {
        const balances = await Moralis.Web3API.account.getTokenBalances({ chain: "bsc" });
        balances.forEach(async (token) => {
            if (token.token_address === tokenContractAddress) {
                let tokenBalance = token.balance / ('1e' + token.decimals)
                let tokenMainAmount = tokenPrice / ('1e' + token.decimals)
                try {
                    if (tokenBalance >= tokenMainAmount) {
                        let result = await Moralis.transfer({
                            type: 'erc20',
                            amount: Moralis.Units.Token(tokenMainAmount, "9"),
                            receiver: userwallet,
                            contractAddress: tokenContractAddress,
                            awaitReceipt: false,
                        })
                        
                        result.on("transactionHash", async (hash) => {
    
                            try {
                                const response = await axios.post("/confirm-withdraw-payment",
                                    {
                                        withdraw_id:wdid,
                                        user_id: parseInt(id),
                                        transaction_id: hash,
                                    },
                                    {
                                        headers: { "Access-Control-Allow-Origin": "origin-list" }
                                    }

                                )
                                alert(response.data.message);
                            } catch (error) {
                                alert("deposit failed");
                            }
                        })
                    } else {
                        alert("not Enough Token");
                    }
                } catch (error) {
                    alert(error.message);
                }
            }
        })

    }

    if (!isAuthenticated && !user) {
        return (
            <Container padding="10" maxH="8xl" maxW="xl" centerContent bg="blue.900">
                <Box padding='10' maxW="3xl" >
                    <Stack spacing="7px">
                        <Heading color="white" size="lg">Payout</Heading>
                        <Text color="white"><Text color="white" fontSize="3xl">{tokenPrice} WFT</Text>will be deducted from your WFT wallet</Text>
                        <Text fontSize="lg" color="white">please login to continue</Text>
                        <Button colorScheme="blue" onClick={() => WalletAuthentication()}>WalletConnect</Button>
                    </Stack>
                </Box>
            </Container>
        )
    }

    return (
        <Container padding="10" maxH="8xl" maxW="xl" centerContent bg="blue.900" >
            <Box padding='10' maxW="3xl" >
                <Stack spacing="7px">
                    <Heading color="white" size="lg">Payout</Heading>
                    <Text color="white"><Text color="white" fontSize="3xl">{tokenPrice} WFT</Text>will be deducted from your WFT wallet</Text>
                    <Button colorScheme="green" onClick={() => Transfer()}>proceed</Button>
                    <Button colorScheme="red" isLoading={isAuthenticating} disabled={isAuthenticating} onClick={() => logout()}>cancel</Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default Payout; 