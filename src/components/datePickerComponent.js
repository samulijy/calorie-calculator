import React, {forwardRef} from 'react'
import DatePicker from "react-datepicker"
import { Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'

class DatePickerComponent extends React.Component {
    state = {
        date: this.props.date
    }

    render() {
        // Buttongroup is not working correctly because we have DatePicker as a button.
        // This custom style makes the input look like a part of the group.
        const calendarButtonStyle = {
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 4
        }
        // Custon input style for calendar. We use Button from reactstrap
        const CalendarButton = forwardRef (({ value, onClick }, ref) => (
            <Button color="primary" onClick={onClick} style={calendarButtonStyle} ref={ref}>
              {value}
            </Button>
        ));
        return (
            <div className="datepicker">
                <ButtonGroup>
                    <Button onClick={this.previousDate} color="primary"><FontAwesomeIcon icon={faChevronLeft}/></Button>
                    <DatePicker
                        customInput={<CalendarButton/>}
                        selected={this.state.date}
                        onChange={date => this.selectDate(date)}
                        dateFormat="dd/MM/yyyy"
                        todayButton="Today"
                    />
                    <Button onClick={this.nextDate} color="primary"><FontAwesomeIcon icon={faChevronRight}/></Button>
                </ButtonGroup>
            </div>
        );
    }

    selectDate = (date) => {
        this.setState({ date }, this.props.handleDateChange(date));
    }

    nextDate = () => {
        let newDate = new Date(this.state.date);
        newDate.setDate(newDate.getDate() + 1);
        this.setState({ date: newDate }, this.props.handleDateChange(newDate));
    }

    previousDate = () => {
        let newDate = new Date(this.state.date);
        newDate.setDate(newDate.getDate() - 1);
        this.setState({ date: newDate }, this.props.handleDateChange(newDate));
    }
}

export default DatePickerComponent;