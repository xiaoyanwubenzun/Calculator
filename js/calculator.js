// 全局变量
let previous = "";
let current = "";

// 创建计算器页面骨架
function initCalculator(){
	let all_btn = ["MC","MR","M+","M-","MS","M","%","CE","C","DEL","1/x","x^2","√","÷","7","8","9","×","4","5","6","-","1","2","3","+","+/-","0",".","="];
	let calculator = document.querySelector(".calculator");
	// 创建dom元素
	let all_dom = document.createElement("div");
	let show_calculator_operation = document.createElement("div");
	let show_calculator_result = document.createElement("div");
	let calculation_result = document.createElement("span");
	let previous = document.createElement("span");
	let operation_choose = document.createElement("span");
	let calculator_standard = document.createElement("div");
	let calculator_memory = document.createElement("div");
	let memory_btn_child_node = document.createElement("div");
	let standard_btn_child_node = document.createElement("div");
	for(let item in all_btn){
		// 创建"MC","MR","M+","M-","MS","M"按钮
		if(item <= 5) {
			let btn_m = document.createElement("button");
			let btn_m_class = btnStyle(all_btn[item]).trim();
			btn_m.innerText = all_btn[item];
			btn_m.setAttribute("class",btn_m_class);
			memory_btn_child_node.appendChild(btn_m);
		}
		// 创建剩余按钮
		else {
			let btn_s = document.createElement("button");
			let btn_s_class = btnStyle(all_btn[item]).trim();
			btn_s.innerText = all_btn[item];
			btn_s.setAttribute("class",btn_s_class);
			standard_btn_child_node.appendChild(btn_s);
		}
	}
	
	// 设置类名
	show_calculator_operation.setAttribute("class","show-calculator-operation");
	previous.setAttribute("class","previous");
	operation_choose.setAttribute("class","operation-choose");
	show_calculator_result.setAttribute("class","show-calculator-result");
	calculation_result.setAttribute("class","calculation-result");
	calculator_memory.setAttribute("class","calculator-memory");
	calculator_standard.setAttribute("class","calculator-standard");

	// 加入创建好的节点元素
	calculation_result.innerText = "0";
	calculator_memory.appendChild(memory_btn_child_node);
	calculator_standard.appendChild(standard_btn_child_node);
	show_calculator_operation.appendChild(previous);
	show_calculator_operation.appendChild(operation_choose);
	show_calculator_result.appendChild(calculation_result);
	all_dom.appendChild(show_calculator_operation);
	all_dom.appendChild(show_calculator_result);
	all_dom.appendChild(calculator_memory);
	all_dom.appendChild(calculator_standard);
	calculator.appendChild(all_dom);

	// 事件委托监控按钮点击
	let standard_btn = document.querySelector(".calculator-standard");
	let btn_up = "";
	let btn_down = "";
	let num_input_arr = ["1","2","3","4","5","6","7","8","9","0"];

	// 鼠标左键按下与鼠标左键抬起事件对象相同才触发对应点击事件
	standard_btn.addEventListener("mousedown",(e) => {
		if(e.button === 0) {
			btn_down = e.srcElement.innerText;
		}
	},false);
	standard_btn.addEventListener("mouseup",(e) => {
		btn_up = e.srcElement.innerText;
		if(btn_down === btn_up) {
			if(isItemInArr(btn_up,num_input_arr)){
				inputNum(btn_up);
			}
			else {
				btn_method[btn_up]();
			}
		}
	},false);
}

// 计算按钮对应class类名
function btnStyle(item) {
	let operation_btn_style_arr = [".","÷","×","-","+","="];
	let num_input_btn_style_arr = ["1","2","3","4","5","6","7","8","9","0"];
	let equals_btn_style_arr = ["="];
	let conversion_btn_style_arr = ["%","CE","C","DEL","1/x","x^2","√","+/-",".","÷","×","-","+"];
	return `${item === "=" ? "equals" : ""} ${isItemInArr(item,operation_btn_style_arr) ? "operation-btn-style" : ""} ${isItemInArr(item,conversion_btn_style_arr) ? "calculator-btn-conversion" : ""} ${isItemInArr(item,num_input_btn_style_arr) ? "calculator-btn-operation" : ""}`;
}

// 给对应按钮添加或取消禁用属性
function changeDisabled(btn_disabled) {
	let btn_disabled_arr = ["MC","MR","M+","M-","MS","M","%","1/x","x^2","√","÷","×","-","+","+/-","."];
	for(let item of document.querySelectorAll(".calculator button")) {
		if(isItemInArr(item.innerText,btn_disabled_arr)) {
			if(btn_disabled){
				item.setAttribute("disabled","disabled");
			}
			else {
				item.removeAttribute("disabled");
			}
		}
	}
}

// 检查是否为数组里的一项
function isItemInArr(value,arr) {
	return arr.indexOf(value) > -1;
}

// 判断是否为数字
function isNumber(value) {
	return typeof Number(value) === "number" && !isNaN(Number(value));
}

// 设置previous
function setPrevious(previous) {
	document.querySelector(".previous").innerText = previous;
}

//获取previous
function getPrevious() {
	return document.querySelector(".previous").innerText;
}

// 选择的计算方式
function chooseOperation(operation) {
	document.querySelector(".operation-choose").innerText = operation;
}

// 返回当前计算方式
function getNowOperation() {
	return document.querySelector(".operation-choose").innerText;
}

// 输入
function inputNum(num) {
	let result = getNowResult();
	
	// 有小数点不对其进行Number转换，Number转换是为了去掉整数开头的0
	result = isItemInArr(".",result.split("")) === true ? document.querySelector(".calculation-result").innerText += num : Number(document.querySelector(".calculation-result").innerText += num);
	
	// 非数字直接清除上次所有输入，输出输入的数字
	if(!isNumber(result)){
		clearAll();
		outputResult(num);
		changeDisabled(false);
		return;
	}
	if(getNowOperation()){
		clearCurrent();
		outputResult(num);
		return;
	}
	outputResult(result);
}

// 输出
function outputResult(result) {
	document.querySelector(".calculation-result").innerText = result;
}

// 返回当前输出
function getNowResult(){
	return document.querySelector(".calculation-result").innerText;
}

// 对输入的第二个数求百分比
function percent() {
	console.log("未确定需求");
}

// 清除当前输入
function clearCurrent() {
	let result = getNowResult();
	// 输出结果异常清除当输入直接清除所有
	if(!isNumber(result)){
		clearAll();
		changeDisabled(false);
		return;
	}
	outputResult("0");
	changeDisabled(false);
}

// 清除所有输入
function clearAll() {
	setPrevious("");
	chooseOperation("");
	outputResult("0");
	changeDisabled(false);
}

// 将输入数字一位一位删除
function deleteInputNum() {
	let result = getNowResult();
	if(!isNumber(result)){
		clearAll();
		outputResult("0");
		changeDisabled(false);
		return
	}
	result = result.slice(0,result.length - 1) === "" ? "0" : result.slice(0,result.length - 1);
	outputResult(result);
}

// 求倒数
function reciprocal() {
	let result = getNowResult();
	let operation = getNowOperation();
	chooseOperation(`1/(${operation === "" ? result : operation})`);
	if(result === "0") {
		outputResult("除数不能为0");
		changeDisabled(true);
		return;
	}
	result = 1 / result;
	outputResult(result);
}

// 求平方数
function square() {
	let result = getNowResult();
	let operation = getNowOperation();
	chooseOperation(`sqr(${operation === "" ? result : operation})`);
	result = result * result;
	outputResult(result);
}

// 开根号
function sqrt() {
	let result = getNowResult();
	let operation = getNowOperation();
	chooseOperation(`√(${operation === "" ? result : operation})`);
	result = Math.sqrt(result);
	if(!isNumber(result)) {
		outputResult("无效输入");
		changeDisabled(true);
		return;
	}
	outputResult(result);
}

// ÷对应函数
function divide() {
	chooseOperation("÷");
	equal();
}

// ×对应函数
function multiply() {
	chooseOperation("×");
	equal();
}

// -对应函数
function subtract() {
	
	// if(getNowOperation() === "-"){
	// 	equal();
	// 	setPrevious(getNowResult());
	// 	console.log("大师傅地方");
	// 	return
	// }
	chooseOperation("-");
	if(previous){
		if(current) {
			equal();
			console.log(previous);
			previous = getNowResult();
			setPrevious(previous);
		}
		else{
			chooseOperation("-");
		}
	}
	else{
		previous = getNowResult();
		setPrevious(previous);
	}
	
}

// +对应函数
function add() {
	chooseOperation("+");
	equal();
}

// =对应函数
function equal() {
	current = getNowResult();
	switch (getNowOperation()) {
	case "+":
		outputResult(previous + current);
		break;
	case "-":
		console.log("先前"+previous);
		console.log("当前"+current);
		outputResult(previous - current);
		break;
	case "×":
		outputResult(previous * current);
		break;
	case "÷":
		outputResult(previous / current);
		break;
		default:
			break;
	}
	current = "";
	console.log("开发中");
}

// 加上或去掉负号
function takeNegative() {
	let result = getNowResult();
	result = -result;
	outputResult(result);
}

// 添加小数点
function addPoint() {
	let result = getNowResult();
	if (result.indexOf(".") === -1){
		result = result += ".";
		outputResult(result);
	}
}

// 按钮对应执行的函数
let btn_method = {
	"%": percent,
	"CE": clearCurrent,
	"C": clearAll,
	"DEL": deleteInputNum,
	"1/x": reciprocal,
	"x^2": square,
	"√": sqrt,
	"÷": divide,
	"×": multiply,
	"-": subtract,
	"+": add,
	"=": equal,
	"+/-": takeNegative,
	".": addPoint
}

// 创建计算器
initCalculator();