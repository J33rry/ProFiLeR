import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Landing from "@/pages/landing";
import { RiContactsFill, RiHome9Fill } from "react-icons/ri";
import { FaSuperpowers } from "react-icons/fa";
import { SiPaloaltonetworks, SiTrustpilot } from "react-icons/si";
import { GiRamProfile } from "react-icons/gi";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
    return (
        <div className="overflow-hidden flex isolate">
            {/* <CustomCursor /> */}
            <Navbar
                list={["Home", "Features", "Working", "Why_Us", "Contact_Us"]}
                ListIcons={[
                    <RiHome9Fill key="home" />,
                    <FaSuperpowers key="superpowers" />,
                    <SiPaloaltonetworks key="paloalto" />,
                    <SiTrustpilot key="trustpilot" />,
                    <RiContactsFill key="contacts" />,
                ]}
            />
            <Landing />

            <Button
                buttonIcon={<GiRamProfile />}
                button="ProfiLer"
                link="/dashboard"
            />
        </div>
    );
}
