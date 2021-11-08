<template>
	<div class="content">
		<div class="calculator">
			<div class="show-calculator-operation">
				<span 
					class="operation-choose" 
					v-cloak
				>
				{{ previous_calculation_init }}{{ operation_choose }}
				</span>
			</div>
			<div class="show-calculator-result">
				<span 
					class="calculation-init" 
					v-cloak
				>
				{{ calculation_init || 0 }}
				</span>
			</div>
			<div class="calculator-memory">
				<button
					:disabled="btn_disabled"
				>
					MC
				</button>
				<button
					:disabled="btn_disabled"
				>
					MR
				</button>
				<button
					:disabled="btn_disabled"
				>
					M+
				</button>
				<button
					:disabled="btn_disabled"
				>
					M-
				</button>
				<button
					:disabled="btn_disabled"
				>
					MS
				</button>
				<button>M^</button>
			</div>
			<div class="calculator-standard">
				<div>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="persent()"
					>
						%
					</button>
					<button
						class="calculator-btn-conversion"
						@click="reset()"
					>
						CE
					</button>
					<button
						class="calculator-btn-conversion"
						@click="clear()"
					>
						C
					</button>
					<button
						class="calculator-btn-conversion"
						@click="deleteInputnum()"
					>
						DEL
					</button>
				</div>
				<div>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="reciprocal()"
					>
						1/x
					</button>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="square()"
					>
						x^2
					</button>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="sqrt()"
					>
						√
					</button>
					<button
						class="operation-btn-style"
						:disabled="btn_disabled"
						@click="divide()"
					>
						÷
					</button>
				</div>
				<div>
					<button
						class="calculator-btn-operation"
						@click="inputNum(7)"
					>
						7
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(8)"
					>
						8
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(9)"
					>
						9
					</button>
					<button
						class="operation-btn-style"
						:disabled="btn_disabled"
						@click="multiply()"
					>
						×
					</button>
				</div>
				<div>
					<button
						class="calculator-btn-operation"
						@click="inputNum(4)"
					>
						4
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(5)"
					>
						5
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(6)"
					>
						6
					</button>
					<button
						class="operation-btn-style"
						:disabled="btn_disabled"
						@click="subtract()"
					>
						-
					</button>
				</div>
				<div>
					<button
						class="calculator-btn-operation"
						@click="inputNum(1)"
					>
						1
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(2)"
					>
						2
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(3)"
					>
						3
					</button>
					<button
						class="operation-btn-style"
						:disabled="btn_disabled"
						@click="add()"
					>
						+
					</button>
				</div>
				<div>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="takeNegative()"
					>
						+/-
					</button>
					<button
						class="calculator-btn-operation"
						@click="inputNum(0)"
					>
						0
					</button>
					<button
						class="calculator-btn-conversion"
						:disabled="btn_disabled"
						@click="addPoint()"
					>
						.
					</button>
					<button
						class="equals operation-btn-style"
						@click="equal()"
					>
						=
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MyCalculator",
		data() {
			return {
				calculation_init: "",
				previous_calculation_init: "",
				operation_choose: null,
				operation: false,
				btn_disabled: false,
				operation_choose_switch: {
					"÷": "/",
					"×": "*",
					"-": "-",
					"+": "+"
				}
			};
		},
		methods: {
			// 输入要进行计算的内容
			inputNum(num) {
				this.calculation_init = this.calculation_init === "除数不能为0" || this.calculation_init === "无效输入" ||this.operation ? (this.calculation_init = num) : `${this.calculation_init}${num}`;
				this.btn_disabled = false;
				this.operation = false;
			},

			// 百分号计算百分数
			persent() {
				this.calculation_init = this.calculation_init / 100;
				this.operation_choose = "%";
			},

			// 只重置结果为""
			reset() {
				this.calculation_init = "";
				this.previous_calculation_init = "";
				this.operation_choose = "CE";
				this.btn_disabled = false;
			},

			// C将结果重置为"",将上次点击的运算清除
			clear() {
				this.calculation_init = "";
				this.previous_calculation_init = "";
				this.operation_choose = "";
				this.btn_disabled = false;
			},

			// 删除，将字符串从最后一位一位删除
			deleteInputnum() {
				if (this.calculation_init === "除数不能为0" || this.calculation_init === "无效输入") {
					this.calculation_init = "";
					return;
				}
				this.calculation_init = this.calculation_init.toString().slice(0,this.calculation_init.toString().length - 1);
				this.operation_choose = "DEL";
				this.btn_disabled = false;
			},

			// 求倒数
			reciprocal() {
				this.operation_choose = "1/x";
				if (this.calculation_init === "0" || this.calculation_init === "") {
					this.calculation_init = "除数不能为0";
					this.btn_disabled = true;
					return;
				}
				this.calculation_init = 1 / this.calculation_init;
			},

			// 平方运算
			square() {
				this.operation_choose = "x^2";
				this.calculation_init = this.calculation_init * this.calculation_init;
			},

			// 开平方
			sqrt() {
				this.operation_choose = "√";
				// 要进行开根号的数不能为负数
				if (parseFloat(this.calculation_init) < 0) {
					this.calculation_init = "无效输入";
					this.btn_disabled = true;
				} else {
					this.calculation_init = Math.sqrt(this.calculation_init);
				}
			},

			// 保存calculation_init
			saveCalculationinit() {
				this.previous_calculation_init = this.calculation_init;
				this.operation = true;
			},

			// 除
			divide() {
				this.equal();
				this.operation_choose = "÷";
				this.saveCalculationinit();
			},

			// 乘
			multiply() {
				this.equal();
				this.operation_choose = "×";
				this.saveCalculationinit();
			},

			// 减
			subtract() {
				this.equal();
				this.operation_choose = "-";
				this.saveCalculationinit();
			},

			// 加
			add() {
				this.equal();
				this.operation_choose = "+";
				this.saveCalculationinit();
			},

			// 添加或除去负号
			takeNegative() {
				this.operation_choose = "+/-";
				this.calculation_init = `${-this.calculation_init}`;
			},

			// 添加小数点
			addPoint() {
				if (this.calculation_init.toString().indexOf(".") === -1) {
					this.calculation_init = `${this.calculation_init === "" ? (this.calculation_init = 0) : this.calculation_init}.`;
				} else if (this.calculation_init.toString().indexOf(".") === -1 && this.calculation_init === "") {
					this.calculation_init = 0;
				}
			},

			// 计算结果
			equal() {
				switch (this.operation_choose) {
				case "÷":
					this.calculation_init = this.previous_calculation_init / this.calculation_init;
					break;
				case "×":
					this.calculation_init = this.previous_calculation_init * this.calculation_init;
					break;
				case "-":
					this.calculation_init = this.previous_calculation_init - this.calculation_init;
					break;
				case "+":
					this.calculation_init = Number(this.previous_calculation_init) + Number(this.calculation_init);
					break;
				default:
					break;
				}
				// console.log(this.operation_choose_switch[`${this.operation_choose}`]);
				// this.calculation_init = this.previous_calculation_init this.operation_choose_switch[this.operation_choose] this.calculation_init;
				this.operation_choose = "";
			},
		},
	};
</script>

<style scoped>
	.content {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	[v-cloak] {
		display: none;
	}

	.calculator {
		width: 400px;
		height: 615px;
		background-color: rgb(241, 241, 241);
		border: 1px black solid;
	}

	.calculator-memory {
		margin-top: 20px;
		height: 30px;
	}

	.calculator-memory button {
		width: 65px;
		transform: scale(0.8);
		line-height: 30px;
		border: none;
	}

	.calculator-standard button {
		width: 100px;
		height: 60px;
		line-height: 60px;
		float: left;
		border: 2px solid #f1f1f1;
	}

	.show-calculator-operation {
		height: 50px;
		margin-top: 50px;
		font-size: 20px;
		color: #c0c0c0;
		line-height: 50px;
	}

	.show-calculator-result {
		height: 100px;
		font-size: 35px;
		color: #000;
		font-weight: 600;
		line-height: 100px;
	}

	.show-calculator-operation,.show-calculator-result{
		text-align: right;
	}

	.operation-choose,
	.calculation-init {
		white-space: nowrap;
		overflow: auto;
		max-width: -webkit-fill-available;
	}

	.calculator button:hover {
		background-color: #d6d4d4;
	}

	.calculator-btn-disabled {
		color: #c0c0c0;
	}

	.calculator-btn-operation {
		font-size: 20px;
		font-weight: 550;
		background-color: #fff;
	}

	.calculator-btn-conversion {
		background-color: #f5f5f5;
	}

	.operation-btn-style {
		font-weight: 300;
		font-size: 25px;
		background-color: #f5f5f5;
	}

	.equals {
		background-color: #8abae0;
	}

	.equals:hover {
		background-color: #4599db!important;
	}
</style>
