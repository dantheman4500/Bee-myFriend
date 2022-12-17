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
import auth from '../utils/auth';
const styles = {
    display: "flex-box",
    // float: "left",
    flexWrap: "wrap",
    margin: "1%"
}

function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    if (auth.loggedIn) {
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
                    <DrawerHeader><Text color="orange.300">Your Account</Text></DrawerHeader>
                    <DrawerBody>
                        <Text><Link href='/Profile'> Go To Profile Page</Link></Text>
                        <br />
                        <Text><Link href='/profileUpdate'>Edit Profile</Link></Text>
                        <br />
                        <Text><Link href='/friends'> Discover New Friends!</Link></Text>
                        <br />
                        <Text><Link href='/donate'> Support Us!</Link></Text>
                        <br />
                        <Text><Link href='/signup'> Sign Up</Link></Text>
                        <br />
                        <Text><Link href='/'> Log Out</Link></Text>
                    </DrawerBody>

                    <DrawerFooter>
                        <Text>Bee My Friend <sup>&#169;</sup> 2022</Text>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
    } else return (
        <h2>Log In First</h2>
    )
}

export default SideBar;