# Android Trusted Web Activity (TWA) 打包指南

1. **准备前端地址**
   - 部署完成后会有 Vercel 站点（`https://<your-project>.vercel.app`），该地址将作为 TWA 的 `startUrl`。
   - 确保 `VITE_API_BASE_URL` 环境变量设置成 Render 的 HTTPS 域名（例如 `https://duitin-api.onrender.com`）。

2. **在 Android Studio 创建 TWA 项目**
   - 使用最新的 Android Studio，选择 “New Project” → “Phone and Tablet App” → “Empty Compose Activity” 或 “Empty Activity” 都可。
   - 在 `app/build.gradle` 中添加 `com.google.androidbrowserhelper:androidbrowserhelper:2.0.0`（或最新版本），启用 `AndroidX`、`Jetifier`。

3. **配置 `Digital Asset Links`**
   - 在 Vercel 站点根目录创建 `/well-known/assetlinks.json`（可用 Vercel Rewrites/redirects，或静态资源）。文件内容示例：
     ```json
     [
       {
         "relation": ["delegate_permission/common.handle_all_urls"],
         "target": {
           "namespace": "android_app",
           "package_name": "com.yourcompany.duitin",
           "sha256_cert_fingerprints": ["<release-certificate-SHA256>"]
         }
       }
     ]
     ```
   - 替换 `package_name` 和签名指纹（release key）。
   - 访问 `https://<your-project>.vercel.app/.well-known/assetlinks.json` 验证可见。

4. **AndroidManifest 配置**
   ```xml
   <manifest ...>
     <application>
       <meta-data
         android:name="android.support.customtabs.trusted.DEFAULT_URL"
         android:value="https://<your-project>.vercel.app" />
       <activity android:name="androidx.browser.trusted.TrustedWebActivityService" />
     </application>
   </manifest>
   ```
   - `startUrl` 填前端域名，确保 `android:exported` 属性根据需求设置。

5. **使用 `TwaLauncher` 启动**
   ```kotlin
   class MainActivity : TrustedWebActivityLauncherDelegateActivity() {
     override fun getLauncher() = TrustedWebActivityLauncher(this)
   }
   ```
   - 可参考 Android Browser Helper 文档：[https://github.com/GoogleChrome/android-browser-helper](https://github.com/GoogleChrome/android-browser-helper)

6. **打包与上架**
   - 运行 `./gradlew assembleRelease` 生成 AAB；用 Play Console 上传。
   - Play Console 里要提交隐私政策、支付信息（支持 Google Play Billing 及其他本地支付），并在版本说明中提及印尼地区合规细节。

如果需要我生成 `assetlinks.json` 示例或协助写 `TwaLauncher`，直接告诉我具体的包名/证书指纹，我可以立即帮你补全。
