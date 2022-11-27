import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"


const UserAvatar = ({ user, size }) => {
    return (
        <Wrap className="userAvator">
            <WrapItem >
                <Avatar 
                    size={size}
                    name={user && user.name}
                    src={"./images/avatar.png"}
                />
            </WrapItem>
        </Wrap>
    )
}
export default UserAvatar
