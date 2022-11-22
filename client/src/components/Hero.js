import { Box, Heading, Container, Text, Stack, Icon } from "@chakra-ui/react"
import { BsHeart } from "react-icons/bs"
import Map from "./Map"

const Hero = (props) => {
    const { title, center, searchResults, setCenter } = props
    return (
        <div className="hero">
            {title === "Profile" && (
                <Map
                    center={center}
                    searchResults={searchResults}
                    setCenter={setCenter}
                />
            )}
            <Container maxW={"3xl"}>
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}
                >
                    <Heading
                        fontWeight={600}
                        lineHeight={"110%"}
                        color={"gold"}
                    >
                        {title} <br />
                        {title !== "Profile" && (
                            <Text as={"span"} color={"gold"}>
                                share the love
                                <Icon as={BsHeart} />
                                share the food
                            </Text>
                        )}
                    </Heading>
                </Stack>
            </Container>
        </div>
    )
}

export default Hero
