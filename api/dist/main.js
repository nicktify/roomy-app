"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets(path_1.join(__dirname, '..', 'static'));
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
    console.log(`Server listening on port: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map