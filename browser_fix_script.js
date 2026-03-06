// 在浏览器控制台运行此脚本来修复数据库
// 复制整个脚本，粘贴到浏览器控制台，按回车执行

(async function fixDatabaseInBrowser() {
  console.log('[BrowserFix] Starting database repair...');
  
  try {
    // 导入数据库
    const { default: db } = await import('./web/out/renderer/assets/index.js').catch(() => {
      // 如果无法动态导入，使用全局 window.db 或者手动访问
      return { default: window.db };
    });
    
    if (!db || !db.files) {
      console.error('[BrowserFix] Cannot access database. Try: window.db or check if database is initialized');
      return;
    }
    
    console.log('[BrowserFix] Database accessed');
    
    const files = await db.files.toArray();
    console.log(`[BrowserFix] Found ${files.length} files to check`);
    
    let fixed = 0;
    const problematicFiles = [];
    
    for (const file of files) {
      let needsUpdate = false;
      const updates = {};
      
      if (typeof file.size === 'object' && file.size !== null) {
        console.warn(`[BrowserFix] File ${file.id} (${file.name}) has object size:`, file.size);
        updates.size = file.size.size || 0;
        needsUpdate = true;
        problematicFiles.push({ id: file.id, name: file.name, issue: 'object size' });
      }
      
      if (typeof file.count === 'object' && file.count !== null) {
        console.warn(`[BrowserFix] File ${file.id} (${file.name}) has object count:`, file.count);
        updates.count = file.count.count || 0;
        needsUpdate = true;
        problematicFiles.push({ id: file.id, name: file.name, issue: 'object count' });
      }
      
      if (needsUpdate) {
        await db.files.update(file.id, updates);
        fixed++;
        console.log(`[BrowserFix] ✅ Fixed file ${file.id}:`, updates);
      }
    }
    
    console.log(`\n=== Fix Summary ===`);
    console.log(`Total files: ${files.length}`);
    console.log(`Fixed files: ${fixed}`);
    console.log(`Problematic files:`, problematicFiles);
    console.log(`\n✅ Database repair complete! Please refresh the page.`);
    
  } catch (error) {
    console.error('[BrowserFix] ❌ Error:', error);
    console.log('\n=== Alternative Method ===');
    console.log('1. Open DevTools Console');
    console.log('2. Type: indexedDB.databases()');
    console.log('3. Find CherryStudio database');
    console.log('4. Consider clearing and re-importing data');
  }
})();

