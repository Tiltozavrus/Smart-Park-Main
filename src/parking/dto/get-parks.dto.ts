import { ApiProperty } from "@nestjs/swagger";
import { GetParkResp } from "./get-park.dto";

export class GetParksParams {
    edges?: string[]
}

export class GetParksResp {
    @ApiProperty(
        {
            type: [GetParkResp],
        }
    )
    items: [GetParkResp]
}