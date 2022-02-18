import moment from "moment";
import { useEffect } from "react";
const Page: React.FC<any> = (props) => {

    const testNow = () => {
        console.log('testNow');
        var now: moment.Moment = moment();
        console.log(now.format());
    }

    const testFormatAndParse = () => {
        console.log('testFormatAndParse');
        var now: moment.Moment = moment();
        //年，月，日，时，分，秒
        var format1 = now.format('YYYY-MM-DD HH:mm:ss');
        console.log(format1);

        //年的第几周，周的星期几。大写的为ISO表示，小写为local表示
        var format2 = now.format('ww-e WW-E');
        console.log(format2);

        //parse
        const parse1 = moment('2021-11-29', 'YYYY-MM-DD');
        console.log(parse1.format());

        const parse2 = moment('2021-11-29 18:29:30', 'YYYY-MM-DD HH:mm:ss');
        console.log(parse2.format());
    }

    const testGet = () => {
        console.log('testGet');
        //以下的API都有搭配的set方法，就不多说了
        var now = moment();

        console.log('year ', now.year());//年份
        console.log('month', now.month());//月份，范围为0-11
        console.log('date', now.date());//天数，范围为1-31
        console.log('hour', now.hour());//小时，范围为0-23，
        console.log('minute', now.minute());//分钟，范围为0-59
        console.log('second', now.second());//秒数，范围为0-59

        console.log('week', now.week());//星期数，与本地有关
        console.log('weekDay', now.weekday());//星期几，与本地有关
        console.log('isoWeek', now.isoWeek());//ISO星期数，ISO标准
        console.log('day', now.day());//星期几，0为星期天，1-6为对应的星期，ISO标准

        console.log('unix', now.unix());//unix时间戳

        //set方法是原地修改的，moment不是immutable类型，这点设计并不好
        const threeDate = now.date(3);
        console.log('threeDate', threeDate.format(), now.format());

        //创建副本
        const now2 = moment();
        const threeDate2 = now2.clone().date(3);
        console.log('threeDate2', threeDate2.format(), now2.format());
    }

    const testOperation = () => {
        console.log('testOperation');
        const now = moment();
        console.log('now', now.format());

        //最近7天范围内，substract也是原地修改，需要用clone创建副本
        const prevSevenDay = now.clone().subtract(7, 'day');
        console.log('prevSevenDay', prevSevenDay.format(), now.format());

        //本月范围内，startOf和endOf都是原地修改，需要用clone创建副本
        const firstDayOfMonth = now.clone().startOf('month');
        const endDayOfMonth = now.clone().endOf('month');
        console.log('month range ', firstDayOfMonth.format(), endDayOfMonth.format());

        //本周范围内，注意从周日开始，周六结束
        const firstDayOfWeek = now.clone().startOf('week');
        const endDayOfWeek = now.clone().endOf('week');
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
    return (<div>{'Moment测试'}</div>);
}

export default Page;