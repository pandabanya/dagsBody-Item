export function getPercentageOfCurrentMonthPassed(currentDate, daysUntilNextMonthPayday) {
	// 获取当前月份的总天数
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const nextMonth = currentMonth + 1;
	let nextYear = currentYear;
	if (nextMonth > 11) {
		nextMonth = 0;
		nextYear += 1;
	}
	const lastDayOfCurrentMonth = new Date(nextYear, nextMonth, 0).getDate();

	// 计算当前日期是当前月份的第几天
	const dayOfCurrentMonth = currentDate.getDate();

	// 计算占比
	const percentageOfCurrentMonthPassed = (dayOfCurrentMonth / lastDayOfCurrentMonth) * 100;

	return percentageOfCurrentMonthPassed;
}
export function getDaysUntilNextMonthPayday(currentDate, payDayOfMonth, isNext) {
	// 获取下个月的发薪日
	const nextMonthPayday = getNextMonthPayday(currentDate, payDayOfMonth, isNext);

	// 计算今天到下个月发薪日的天数差
	const daysUntilNextMonthPayday = (nextMonthPayday - currentDate) / (1000 * 60 * 60 * 24);

	return Math.ceil(daysUntilNextMonthPayday);

}
function getNextMonthPayday(currentDate, payDayOfMonth, isNext) {
	// 获取当前年份和月份
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	let nextMonth = 0
	// 计算下个月的年份和月份
	if (isNext) {
		nextMonth = currentMonth + 1;
	} else {
		nextMonth = currentMonth
	}

	let nextYear = currentYear;
	if (nextMonth > 11) {
		nextMonth = 0;
		nextYear += 1;
	}

	// 创建下个月的第一天的日期对象
	const firstDayOfNextMonth = new Date(nextYear, nextMonth, 1);

	// 计算下个月的发薪日
	const nextMonthPayday = new Date(firstDayOfNextMonth);
	nextMonthPayday.setDate(payDayOfMonth);

	return nextMonthPayday;
}