<template>
	<div class="content">
		<div class="calculator">
			<div class="show-calculator-operation">
				<span 
					class="operation-choose" 
				>
				{{ `${previous_calculation_init}${operation_choose}` }}
				</span>
			</div>
			<div class="show-calculator-result">
				<span 
					class="calculation-init" 
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
			<div 
				class="calculator-standard" 
				@click="getBtnClick"
			>
				<div>
					<button
						v-for="(item,index) in all_btn" 
						:key="index"
						:disabled="btnDisabled(item)"
						:class="btnStyle(item)"
					>
						{{item}}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const ALL_BTN = Object.freeze(["%","CE","C","DEL","1/x","x^2","√","÷","7","8","9","×","4","5","6","-","1","2","3","+","+/-","0",".","="]);
	const INPUT_NUM_ARR = Object.freeze([1,2,3,4,5,6,7,8,9,0]);
	const SELF_OPERATION_ARR = Object.freeze(["%","CE","C","DEL","1/x","x^2","√","+/-"]);
	const OPERATION_ARR = Object.freeze(["÷","×","-","+"]);
	const SELF_OPERATION_METHOD_SWITCH = Object.freeze({
					"%": "percent",
					"CE": "clearResult",
					"C": "clearShow",
					"DEL": "deleteInputNum",
					"1/x": "reciprocal",
					"x^2": "square",
					"√": "sqrt",
					"+/-": "takeNegative"
				});
	const OPERATION_METHOD_SWITCH = Object.freeze({
					"÷": "divide",
					"×": "multiply",
					"-": "subtract",
					"+": "add",
				});
	export default {
		name: "MyCalculator",
		data() {
			return {
				all_btn: ALL_BTN,
				calculation_init: "",
				previous_calculation_init: "",
				operation_choose: "",
				operation: false,
				btn_disabled: false,
				input_num_arr: INPUT_NUM_ARR,
				self_operation_arr: SELF_OPERATION_ARR,
				operation_arr: OPERATION_ARR,
				self_operation_method_switch: SELF_OPERATION_METHOD_SWITCH,
				operation_method_switch: OPERATION_METHOD_SWITCH
			};
		},
		watch: {
			calculation_init() {
				if(this.calculation_init.toString().indexOf(".") === -1) {
					this.calculation_init = this.calculation_init.toString().replace(/\b(0+)/ig,"");
				}
			},

			previous_calculation_init() {
				if(this.previous_calculation_init === "除数不能为零") {
					this.previous_calculation_init = "";
				}
			}
		},
		methods: {
			// 计算按钮是否可更改禁用属性
			btnDisabled(item) {
				return ["%","1/x","x^2","√","÷","×","-","+","+/-","."].indexOf(item) > -1 ? this.btn_disabled : false;
			},

			// 计算按钮对应样式
			btnStyle(item) {
				return `${item === "=" ? "equals" : ""} ${[".","÷","×","-","+","="].indexOf(item) > -1 ? "operation-btn-style" : ""} ${this.self_operation_arr.concat([".","÷","×","-","+"]).indexOf(item) > -1 ? "calculator-btn-conversion" : "calculator-btn-operation"}`;
			},

			// 判断是否为数字
			isNumber(value) {
				return typeof value === "number" && !isNaN(value);
			},

			// 输入要进行计算的内容
			inputNum(num) {
				// 非数字或已选择计算方式，重新输入
				if (!this.isNumber(Number(this.calculation_init)) || this.operation) {
					this.calculation_init = num;
					this.btn_disabled = false;
					this.operation = false;
				}
				else {
					this.calculation_init = `${this.calculation_init}${num}`;
				}
			},

			// 百分号计算百分数
			percent() {
				this.calculation_init = this.calculation_init / 100;
			},

			// 只重置结果为""
			clearResult() {
				this.calculation_init = "";
				this.previous_calculation_init = "";
				this.operation_choose = "CE";
				this.btn_disabled = false;
			},

			// C将结果重置为"",将上次点击的运算清除
			clearShow() {
				this.calculation_init = "";
				this.previous_calculation_init = "";
				this.operation_choose = "";
				this.btn_disabled = false;
			},

			// 删除，将字符串从最后一位一位删除
			deleteInputNum() {
				//非数字直接重置
				if (!this.isNumber(Number(this.calculation_init))) {
					this.calculation_init = "";
					this.btn_disabled = false;
					return;
				}
				this.calculation_init = this.calculation_init.toString().slice(0,this.calculation_init.toString().length - 1);
				this.operation_choose = "DEL";
				this.btn_disabled = false;
			},

			// 求倒数
			reciprocal() {
				if (this.calculation_init === "0" || this.calculation_init === "") {
					this.calculation_init = "除数不能为零";
					this.btn_disabled = true;
					return;
				}
				this.calculation_init = 1 / this.calculation_init;
			},

			// 平方运算
			square() {
				this.calculation_init = this.calculation_init * this.calculation_init;
			},

			// 开平方
			sqrt() {
				// 要进行开根号的数不能为负数
				if (parseFloat(this.calculation_init) < 0) {
					this.calculation_init = "无效输入";
					this.btn_disabled = true;
					return
				} 
				this.calculation_init = Math.sqrt(this.calculation_init);
			},

			// 保存calculation_init
			saveCalculationInit() {
				this.previous_calculation_init = this.calculation_init;
				this.operation = true;
			},

			// 改变operation_choose
			changeOperationChoose(operation_choose) {
				this.operation_choose = operation_choose;
			},

			// 除
			divide() {
				if (this.calculation_init === "0" || this.calculation_init === "") {
					this.btn_disabled = true;
					return "除数不能为零";
				}
				return this.previous_calculation_init / this.calculation_init;
			},

			// 乘
			multiply() {
				return this.previous_calculation_init * this.calculation_init;
			},

			// 减
			subtract() {
				return this.previous_calculation_init - this.calculation_init;
			},

			// 加
			add() {
				return Number(this.previous_calculation_init) + Number(this.calculation_init);
			},

			// 添加或除去负号
			takeNegative() {
				this.calculation_init = `${-this.calculation_init}`;
			},

			// 添加小数点
			addPoint() {
				if (this.calculation_init.toString().indexOf(".") === -1) {
					this.calculation_init = `${this.calculation_init === "" ? (this.calculation_init = 0) : this.calculation_init}.`;
				} 
				else if (this.calculation_init.toString().indexOf(".") === -1 && this.calculation_init === "") {
					this.calculation_init = 0;
				}
			},

			// 计算结果
			equal() {
				if(!this.operation_choose || this.self_operation_arr.indexOf(this.operation_choose) > -1){
					return
				}
				this.calculation_init = this[this.operation_method_switch[this.operation_choose]]();
				this.operation = false;
			},

			// 获取点击的按钮
			getBtnClick(event){
				const btn_clicked = event.target.innerText;
				if (this.input_num_arr.indexOf(Number(btn_clicked)) > -1) {
					this.inputNum(Number(btn_clicked));
				}
				else if (this.self_operation_arr.indexOf(btn_clicked) > -1){
					this.changeOperationChoose(btn_clicked);
					this[this.self_operation_method_switch[`${btn_clicked}`]]();
				}
				else if (this.operation_arr.indexOf(btn_clicked) > -1) {
					this.equal();
					this.saveCalculationInit();
					this.changeOperationChoose(btn_clicked);
				}
				else if (btn_clicked === "=") {
					this.equal();
					this.operation_choose = "";
				}
				else if (btn_clicked === ".") {
					this.addPoint();
				}
			},
		},
	};
</script>

<style scoped>
	.content {
		height: 98vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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

	.show-calculator-operation,
	.show-calculator-result{
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.operation-choose,
	.calculation-init {
		white-space: nowrap;
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
		font-family: auto;
		background-color: #f5f5f5;
	}

	.equals {
		background-color: #8abae0;
	}

	.equals:hover {
		background-color: #4599db!important;
	}
</style>
