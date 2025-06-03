import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";
import ICard from "../../interface/ICard";
import { gameContext } from "../Game";
import IGameContextAPI from "../../interface/IGameContextAPI";
import ECardState from "../../enum/ECardState";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";

export default function BoardPane({cards}: {cards: Array<ICard>}) {
    const gameContextAPI = useContext(gameContext) as IGameContextAPI;
    return (
        <Box sx={{ maxWidth: '600px', display: 'grid',gridTemplateRows: 'repeat(3, 200px)', gridTemplateColumns: 'repeat(3, 200px)', gap: 0 }}>
            {cards.map((card, index) => (
                <Card key={'boardPane-card '+index} sx={{borderRadius: 0, minHeight: '200px', minWidth: '200px'}} data-index={index}>
                    <CardActionArea 
                        sx = {{ 
                            height: '100%', 
                            '&[data-active]': {
                                backgroundColor: 'action.selected',
                                '&:hover': {
                                    backgroundColor: 'action.selectedHover',
                                },
                            },
                        }}
                        data-index = {index}
                        onClick={(e) => gameContextAPI.tryPlayTurn(e)}
                    >
                        <CardContent data-index={index} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {(card.state !== ECardState.undefined)? ((card.state === ECardState.cross)? <ImCross size={64} /> : <FaRegCircle size={64} />): undefined}
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}