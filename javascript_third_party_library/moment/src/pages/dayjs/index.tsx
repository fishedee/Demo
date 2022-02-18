import dayjs from "dayjs";
import 'dayjs/locale/zh-cn' // 导入本地化语言

import { useEffect } from "react";
const Page: React.FC<any> = (props) => {

    const testNow = () => {
        console.log('testNow');
        var now: dayjs.Dayjs = dayjs();
        console.log(now.format());
    }

    const testFormatAndParse = () => {
        console.log('testFormatAndParse');
        var now: dayjs.Dayjs = dayjs();
        //年，月，日，时，分，秒
        var format1 = now.format('YYYY-MM-DD HH:mm:ss');
        console.log(format1);

        //没有week
        //var format2 = now.format('ww-e WW-E');
        //console.log(format2);

        //parse
        const parse1 = dayjs('2021-11-29', 'YYYY-MM-DD');
        console.log(parse1.format());

        const parse2 = dayjs('2021-11-29 18:29:30', 'YYYY-MM-DD HH:mm:ss');
        console.log(parse2.format());
    }

    const testGet = () => {
        console.log('testGet');
        //以下的API都有搭配的set方法，就不多说了
        var now = dayjs();

        console.log('year ', now.year());//年份
        console.log('month', now.month());//月份，范围为0-11
        console.log('date', now.date());//天数，范围为1-31
        console.log('hour', now.hour());//小时，范围为0-23，
        console.log('minute', now.minute());//分钟，范围为0-59
        console.log('second', now.second());//秒数，范围为0-59

        //console.log('week', now.week());//没有星期数
        //console.log('weekDay', now.weekday());//没有星期数
        //console.log('isoWeek', now.iso());//没有星期数
        console.log('day', now.day());//星期几，0为星期天，1-6为对应的星期，ISO标准

        console.log('unix', now.unix());//unix时间戳

        //set方法返回新数据的，dayjs是immutable类型，这点设计很好
        const threeDate = now.date(3);
        console.log('threeDate', threeDate.format(), now.format());
    }

    const testOperation = () => {
        console.log('testOperation');
        const now = dayjs();
        console.log('now', now.format());

        //最近7天范围内
        const prevSevenDay = now.subtract(7, 'day');
        console.log('prevSevenDay', prevSevenDay.format(), now.format());

        //本月范围内
        const firstDayOfMonth = now.startOf('month');
        const endDayOfMonth = now.endOf('month');
        console.log('month range ', firstDayOfMonth.format(), endDayOfMonth.format());

        //本周范围内，注意从周日开始，周六结束
        const firstDayOfWeek = now.startOf('week');
        const endDayOfWeek = now.endOf('week');
        console.log('week range ', firstDayOfWeek.format(), endDayOfWeek.format());

        //比较
        console.log('equal diff', firstDayOfWeek.diff(firstDayOfWeek));
        console.log('less diff', firstDayOfWeek.diff(endDayOfWeek));
        console.log('great diff', endDayOfWeek.diff(firstDayOfWeek));
    }
    useEffect(() => {
        testNow();
        testFormatAndParse();
        testGet();
        testOperation();
    }, []);
    return (<div>{'Dayjs测试'}</div>);
}

export default Page;