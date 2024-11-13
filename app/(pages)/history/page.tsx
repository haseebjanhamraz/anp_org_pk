import OverviewPashtunNationalism from "@/app/components/history_components/overview-of-pashtun-nationalism"
import BachaKhanAndResistence from "@/app/components/history_components/bachakhan-nonviolent-resistence"
import PartitionOfIndia from "@/app/components/history_components/partition-of-india"
import NAPAndRiseOfWaliKhan from "@/app/components/history_components/nap-and-rise-of-wali-khan"
import NAPAllianceWithPakistan from "@/app/components/history_components/nap-alliance-with-pakistan"
import TheFormationOfANP from "@/app/components/history_components/the-formation-of-anp"
import PoliticalRepressionAndChallenges from "@/app/components/history_components/political-repression"
import DemocraticEraAndANPsRole from "@/app/components/history_components/democratic-era"
import ANPStanceOnTerrorism from "@/app/components/history_components/anp-stance-on-terrorism"
import ANPInRecentDecades from "@/app/components/history_components/anp-in-recent-decades"
import HistoryNavigator from "@/app/components/history_components/HistoryNavigator"
export default function page() {

    return (

        <div className="space-y-10">
            <HistoryNavigator />
            <OverviewPashtunNationalism />
            <BachaKhanAndResistence />
            <PartitionOfIndia />
            <NAPAndRiseOfWaliKhan />
            <NAPAllianceWithPakistan />
            <TheFormationOfANP />
            <PoliticalRepressionAndChallenges />
            <DemocraticEraAndANPsRole />
            <ANPStanceOnTerrorism />
            <ANPInRecentDecades />
        </div>
    )
}
