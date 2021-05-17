require('colors');
const { exec } = require('child_process');
const fs = require('fs');
const { CLIEngine } = require('eslint');
const cli = new CLIEngine({ fix: true });
const grepStagedScripts = 'git diff --cached --name-only | grep -E "src.*" || true;';

function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}

const notFromLib = path => !/^packages\/.+\/lib/.test(path);
const isScripts = path => /\.(js|jsx|ts|tsx)$/.test(path);

let exitCode = 0;
exec(grepStagedScripts, (error, stdout) => {
  if (stdout.length) {
    console.log('开始执行代码检查....'.cyan);

    const files = stdout
      .split('\n')
      .filter(fs.existsSync)
      .filter(notFromLib)
      .filter(isScripts);

    if (files.length) {
      console.log('\n开始检查以下文件: ');
      console.log(files.join('\n'));
    }

    const report = cli.executeOnFiles(files);
    let errorCount = 0;
    let warningCount = 0;

    const autoFixedFiles = report.results.filter(result => result.output);

    if (autoFixedFiles.length) {
      console.log('自动修复以下文件:');
      console.log(autoFixedFiles.map(result => result.filePath).join('\n'));
    }

    report.results.forEach(result => {
      errorCount += result.errorCount;
      warningCount += result.warningCount;

      if (result.messages.length > 0) {
        console.log('\n');
        console.log(result.filePath);

        result.messages.forEach(obj => {
          const level = getErrorLevel(obj.severity);
          console.log(
            `   ${obj.line || '--'}:${obj.column || '--'}  ${level}  ${
              obj.message
            }  ${obj.ruleId || ''}`
          );

          if (level === 'error') {
            exitCode = 1;
          }
        });
      }
    });

    CLIEngine.outputFixes(report);

    console.log(
      `\n   ${errorCount +
        warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)\n`
    );

    if (errorCount > 0) {
      console.log('\n代码检查失败：请先修复以上问题再提交\n'.red);
    } else {
      console.log('\n代码检查通过\n'.cyan);
    }

    process.exit(exitCode);
  }

  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
