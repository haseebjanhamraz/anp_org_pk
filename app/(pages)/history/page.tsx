import OverviewPashtunNationalism from '../../components/history_components/overview-of-pashtun-nationalism'
import BachaKhanAndResistence from '../../components/history_components/bachakhan-nonviolent-resistence'
import PartitionOfIndia from '../../components/history_components/partition-of-india'
import NAPAndRiseOfWaliKhan from '../../components/history_components/nap-and-rise-of-wali-khan'
import NAPAllianceWithPakistan from '../../components/history_components/nap-alliance-with-pakistan'
import TheFormationOfANP from '../../components/history_components/the-formation-of-anp'
import PoliticalRepressionAndChallenges from '../../components/history_components/political-repression'
import DemocraticEraAndANPsRole from '../../components/history_components/democratic-era'
import ANPStanceOnTerrorism from '../../components/history_components/anp-stance-on-terrorism'
import ANPInRecentDecades from '../../components/history_components/anp-in-recent-decades'
import HistoryNavigator from '../../components/history_components/HistoryNavigator'
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
