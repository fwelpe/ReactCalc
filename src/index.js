import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Square = (props) => {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Calc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expr: Array(1).fill(0),
        };
    }

    handleClick(v) {
        if (!v)
            return;
        let expr_array = [...this.state.expr];
        if (Number.isInteger(v)) {
            if (!Number.isInteger(expr_array[expr_array.length - 1]))
                expr_array.push(0);
            expr_array[expr_array.length - 1] = expr_array[expr_array.length - 1] * 10 + v;
        } else if (v === 'C')
            expr_array = [0];
		else if (v !== '=' && expr_array.length >= 1 && Number.isInteger(expr_array[expr_array.length - 1]))
           	expr_array.push(v);
        else if (v === '=' && expr_array.length > 1) {
            expr_array = [this.result()];
        }
        this.setState(
            {
                expr: expr_array
            }
        );
    }

    result() {
        if (this.state.expr.length === 1)
            return null;
        let result = 0;
        let op;
        const expr_array = [...this.state.expr];
        let i = -1;
        while (++i < expr_array.length) {
            if (!Number.isInteger(expr_array[i]))
                op = expr_array[i];
            else if (op) {
                if (op === '+')
                    result += expr_array[i];
                else if (op === '-')
                    result -= expr_array[i];
            } else {
                result += expr_array[i];
            }
        }
        return result;
    }

    renderSquare(i) {
        return (
            <Square
                value={i}
                onClick={() => this.handleClick(i)}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="status">{this.state.expr.join(' ')}</div>
                <div className="result">{this.result()}</div>
                <div className="board-row">
                    {this.renderSquare('+')}
                    {this.renderSquare('-')}
                    {this.renderSquare('=')}
                </div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
                <div className="board-row">
                    {this.renderSquare('C')}
                    {this.renderSquare(0)}
                    {this.renderSquare()}
                </div>
            </div>);
    }
}


ReactDOM.render(<Calc />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
