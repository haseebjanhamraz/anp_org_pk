import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io5";



export const menu = [{
    name: "Home",
    link: "/"
},
{
    name: "Party",
    link: "/party"
},
{
    name: "About",
    link: "/about"
},
{
    name: "History",
    link: "/history"
},
{
    name: "Contact",
    link: "/contact"
}
]
export const leadership = [{
    name: "Aimal Wali Khan ",
    position: "President",
    intro: "Aimal Wali Khan is grandson of Khan Abdul Wali Khan and currently president of Awami National Party.",
    image: "",
    social: {
        facebook: {
            link: "https://www.facebook.com/",
            name: "Facebook"
        },
        twitter: {
            link: "https://www.twitter.com/",
            name: "Twitter"
        },
        instagram: {
            link: "https://www.instagram.com/",
            name: "Instagram"
        },
        email: "awk@anp.org.pk",
        residence: "Charsadda"
    }
}, {
    name: "Ihsan Ullah Khan",
    position: "General Secretary",
    intro: "Mian Iftikhar Hussain is a renowned journalist and currently General Secretary",
    image: "",
    social: {
        facebook: {
            link: "https://www.facebook.com/",
        },
        twitter: {
            link: "https://www.twitter.com/",
        },
        instagram: {
            link: "https://www.instagram.com/",
        },
        email: "email@gmail.com",
    }
}

]

export const socialMedia = [{
    link: "https://facebook.com/ANPMarkaz",
    icon: FaFacebookSquare
},
{
    link: "https://x.com/ANPMarkaz",
    icon: FaSquareXTwitter
},
{
    link: "https://instagram.com/ANPMarkaz",
    icon: FaSquareInstagram
},
{
    link: "https://youtube.com/c/@AMNPeshawar",
    icon: IoLogoYoutube
},
{
    link: "https://tiktok.com/ANPMarkaz",
    icon: AiFillTikTok
},

]

export const introduction = [{
    title: "Awami National Party",
    short_description: `
    The Awami National Party is a Pashtun nationalist, secular and leftist political party in Pakistan. The party was founded by Abdul Wali Khan in 1986 and its current president is Asfandyar Wali Khan, grandson of Bacha Khan, with Mian Iftikhar Hussain serving as the Secretary-General.

Part of the PPP-led cabinet of the Pakistani government during 2008−13, ANP’s political position is considered left-wing, advocating for secularism, public sector government, and social egalitarianism
    `
}]
