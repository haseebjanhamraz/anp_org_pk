import { Badge } from "./ui/badge"

export function CabinetBadge(props) {

    return <Badge variant="outline">
        {props.cabinetType}
    </Badge>
}
