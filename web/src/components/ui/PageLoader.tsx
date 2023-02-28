import React from "react";
import { Grid } from "react-loader-spinner"
import { Container } from "reactstrap";
import CommonSection from "@/components/ui/Common-section/CommonSection";

const PageLoader = () => {
    return (
        <>
            <CommonSection title={"MarketPlace"} />
            <section>
                <Container className="center__loader">
                    <Grid
                        height="80"
                        width="80"
                        color="#cb2d3e"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </Container>
            </section>
        </>
    )
}

export default PageLoader