

export class TestScriptsOne {

    constructor(page: any) {
        this.test3D(page);
    }

    async test3D(page) {
        console.log('开始执测试微件')
        await page.mouse.down();
        await page.mouse.move(0, 300, { steps :20 });
        await page.mouse.move(300, 300, { steps : 20 });
        await page.mouse.move(300, 0, { steps : 20 });
        await page.mouse.up();
    }
}