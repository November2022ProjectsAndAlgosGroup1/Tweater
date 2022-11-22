import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"

const UserAvatar = ({ user, size }) => {
    return (
        <Wrap>
            <WrapItem>
                <Avatar
                    size={size}
                    name={user && user.name}
                    src={
                        user.userName === "iamsam"
                            ? "/images/sam.jpeg"
                            : user.userName === "parisa"
                            ? "/images/parisa.jpeg"
                            : user.userName === "NOTjessie"
                            ? "/images/jgreen.jpeg"
                            : user.userName === "ajstimson"
                            ? "/images/andrew.jpeg"
                            : user.userName === "peewee"
                            ? "/images/peewee.jpeg"
                            : "/images/bean.jpg"
                    }
                />
            </WrapItem>
        </Wrap>
    )
}
export default UserAvatar
