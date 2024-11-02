import {Random, Console} from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
class LottoList{
    numitem;
    lottolist=[];
    winnubmers=[];
    bonusnubmer = [];
    constructor(budget) {
        this.numitem = this.buy(budget);
        this.getlotto();
    }

    checkwinnumbers(num){
        if(isNaN(num))
            this.makeError("당첨번호는 숫자입니다.");

        if(num<0 || num>45)
            this.makeError("당첨번호는 1~45 값입니다.");

    }
    async setwinnumbers(){
        let numsInput = await Console.readLineAsync("당첨 번호를 입력해 주세요.");
        this.winnubmers = numsInput.split(',');
        if(this.winnubmers.length!==6)
            this.makeError("당첨번호는 6개 입니다");
        this.winnubmers.forEach(num=>{checkwinnumbers(num);})
        this.bonusnubmer = await Console.readLineAsync("보너스 번호를 입력해 주세요.");
        this.checkwinnumbers(this.bonusnubmer);
    }

    printbuyotto(){
        Console.print(this.numitem+"개를 구매했습니다.");
        this.lottolist.forEach((lotto)=>{lotto.printnums();});
    }
    getlotto(){
        for(let i=0;i<this.numitem;i++)
            this.lottolist.push(new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)));
    }

    makeError(message){
        throw new Error("[Error] : "+ message);
    }

    budgetcheck(budget){
        if(budget%1000!==0)
            this.makeError("금액은 1000원 단위입니다");
    }

    buy(budget){
        this.budgetcheck(budget);
        return budget/1000;
    }

}
export default LottoList;