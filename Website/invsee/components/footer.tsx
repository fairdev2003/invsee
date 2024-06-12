'use client'



const Footer = () => {
    return (
        <footer>
            <div className="flex flex-wrap gap-10 bg-blue-700 w-full text-white font-[500] text-lg h-auto p-10 justify-center items-center">
                <div className="w-1/3 flex flex-col justify-center items-center text-start">
                    Invsee Minecraft Wiki
                </div>
                <div className="w-1/3 flex flex-col justify-center items-center text-start">
                    <p>Mods</p>
                    <p>Items</p>
                    <p>Invsee Mod</p>
                    <p>Item Explorer</p>
                    <p>Item Search</p>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-center text-start">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Cookie Policy</p>
                    <p>Paymant Policy</p>
                    <p>FAQ</p>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer;