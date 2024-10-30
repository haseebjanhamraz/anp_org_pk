import ReadData from "@/app/lib/Data";


const About = () => {
    const data = ReadData()
    console.log(data)
    return (
        <div className="container  px-14 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">About the Awami National Party (ANP)</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction to ANP</h2>
                <p>
                    The Awami National Party (ANP) has its roots in the struggles led by Khan Abdul Ghaffar Khan and the Khudai Khidmatgar movement, focusing on nonviolent resistance against British colonial rule and advocating for Pashtun rights. The party emerged as a significant political force advocating for secularism and democracy, reflecting the aspirations of the Pashtun community.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Historical Context and Ideology</h2>
                <p>
                    Bacha Khan's nonviolent resistance and the ideology of the Khudai Khidmatgar movement were pivotal in shaping ANP’s foundation. The party emphasizes peaceful means to achieve political objectives, drawing from its commitment to secularism, education, and social justice. Bacha Khan's alliances with leaders like Gandhi reinforced the party's ethos of nonviolence and community empowerment.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Impact of Partition</h2>
                <p>
                    The partition of India in 1947 had profound implications for ANP, as many leaders, including Bacha Khan, opposed the creation of Pakistan. The new political landscape led to significant repression of the Khudai Khidmatgar movement, forcing its leaders to adapt to an increasingly hostile environment.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Formation of the National Awami Party (NAP)</h2>
                <p>
                    In 1957, ANP's predecessor, the National Awami Party (NAP), was formed, uniting various leftist and nationalist factions under Abdul Wali Khan's leadership. The party’s agenda focused on socialism, secularism, and provincial autonomy, seeking to address the concerns of marginalized communities.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Alliance with the Pakistan Peoples Party (PPP)</h2>
                <p>
                    ANP's participation in the 1970 elections under the PPP platform resulted in significant victories in Khyber Pakhtunkhwa and Balochistan. However, rising tensions with Zulfikar Ali Bhutto's administration led to political turmoil and the eventual ban on ANP, with Abdul Wali Khan imprisoned.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Formation of Awami National Party (ANP)</h2>
                <p>
                    Under General Zia-ul-Haq’s rule, ANP was reformed, emphasizing a commitment to nationalism and secularism. Established in 1986, the party unified various democratic forces and reaffirmed its positions on federalism, democracy, and Pashtun autonomy.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Political Repression During Zia’s Rule</h2>
                <p>
                    Zia-ul-Haq's government employed repressive tactics against secular and nationalist movements. ANP actively participated in pro-democracy movements, collaborating with other parties despite facing internal challenges and opposition.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Democratic Era in the 1990s</h2>
                <p>
                    Following Zia’s death, ANP engaged actively in electoral politics, forming coalitions with the PPP and other parties to govern Khyber Pakhtunkhwa. The party achieved significant policy advancements, particularly in advocating for Pashtun rights and social welfare.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. ANP’s Stance on the War on Terror</h2>
                <p>
                    Post-9/11, ANP adopted a firm anti-Taliban stance, advocating for secularism and community resilience against extremism. The party's participation in the 2008 elections focused on curbing radical influences, despite facing significant challenges, including the tragic loss of many leaders and activists to terrorist violence.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. ANP in Recent Decades</h2>
                <p>
                    In recent years, ANP has continued its struggle for Pashtun rights, focusing on key issues such as education, healthcare, and regional stability. With a leadership transition to Aimal Wali Khan, the party aims to engage younger generations and maintain its relevance in the evolving political landscape.
                </p>
            </section>

            <footer className="text-center mt-12">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Awami National Party. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default About;
