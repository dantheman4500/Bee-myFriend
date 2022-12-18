import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Text,
    Link
} from '@chakra-ui/react';
import Auth from '../utils/auth';

//custom css styling
const styles = {
    display: "flex-box",
    float: "left",
    flexWrap: "wrap",
    margin: "1%"
}

// function to display menu button for the side bar drawer
function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    if (Auth.loggedIn()) {
        return (
            <>
                <Button ref={btnRef} bg='orange.300' onClick={onOpen} style={styles}>
                    Open Menu
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Your Account</DrawerHeader>
                        <DrawerBody>
                            <Text><Link href='/Profile'>View Profile</Link></Text>
                            <br />
                            <Text><Link href='/profileUpdate'>Edit Profile</Link></Text>
                            <br />
                            <Text><Link href='/friends'> Discover New Friends!</Link></Text>
                            <br />
                            <Text><Link href='/donate'> Support Us!</Link></Text>
                            {/* <br />
                            <Text><Link href='/signup'> Sign Up</Link></Text> */}
                            <br />
                            <Text><Link href='/logout'>Logout</Link></Text>
                        </DrawerBody>
                        <DrawerFooter>
                            <Text>Bee My Friend<sup>&#169;</sup></Text>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        )
    } else return (
        <p></p>
    )
}

export default SideBar;