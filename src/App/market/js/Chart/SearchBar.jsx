import React from "react";
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Row
} from 'reactstrap';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.changeTimeFrameState = this.changeTimeFrameState.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getChart = this.getChart.bind(this);
        this.state = {
            dropdownOpen: false,
            splitButtonOpen: false,
            timeFrame: "5min",
            timeFrameText: "5 Mins"
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSplit() {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    }

    changeTimeFrameState(event) {
        this.setState({
            timeFrame: event.target.value,
            timeFrameText: event.target.innerText
        })
    }


    onInputChange(event) {
        this.setState({
            market: event.target.value
        });
    }

    getChart(event) {
        this.props.onStockSymbolChange(this.state.market, this.state.timeFrame);
    }

    render() {
        return (
            <Row>
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen}
                                              toggle={this.toggleDropDown}>
                        <DropdownToggle caret outline>
                            {this.state.timeFrameText}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Time Frame</DropdownItem>
                            <DropdownItem value={"1min"} onClick={this.changeTimeFrameState}>1 Min</DropdownItem>
                            <DropdownItem value={"5min"} onClick={this.changeTimeFrameState}>5 Mins</DropdownItem>
                            <DropdownItem value={"15min"} onClick={this.changeTimeFrameState}>15 Mins</DropdownItem>
                            <DropdownItem value={"30min"} onClick={this.changeTimeFrameState}>30 Mins</DropdownItem>
                            <DropdownItem value={"60min"} onClick={this.changeTimeFrameState}>60 Mins</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input placeholder="Market..." onChange={(e) => this.onInputChange(e)}/>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={() => this.getChart()}>Get Chart</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Row>
        )
    }
}

export default SearchBar