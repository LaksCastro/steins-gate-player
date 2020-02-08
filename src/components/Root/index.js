import React from "react";

import * as S from "./styles";

export default function Root() {
    return (
        <S.Wrapper>
            <S.Header></S.Header>
            <S.Body></S.Body>
            <S.BottomNavigation />
        </S.Wrapper>
    );
}
