require('colors');
const os = require('os');
const { spawnSync } = require('child_process');
const prompts = require('prompts');
const npm = os.platform() === 'win32' ? 'npm.cmd' : 'npm';
const { name, version } = require(`${process.cwd()}/package.json`);
let newVersion;

console.log('项目名: ' + name.cyan);
console.log('当前版本: ' + `v${version}`.cyan);
console.log('\n');

const questions = [
  {
    type: 'select',
    name: 'registry',
    message: '要发布到哪个镜像?',
    choices: [
      {
        title: '默认镜像',
        description: '不指定registry',
        value: 'nil',
      },
    ],
    hint: '按箭头选择镜像',
  },
  {
    type: 'select',
    name: 'mode',
    message: '要如何进行发布?',
    choices: [
      {
        title: '发布大版本',
        description: '递增版本号的首位',
        value: 'major',
      },
      {
        title: '发布小版本',
        description: '递增版本号的中位',
        value: 'minor',
      },
      {
        title: '发布补丁',
        description: '递增版本号的末位',
        value: 'patch',
      },
      {
        title: '不修改版本号',
        description: '可以手动修改 package.json',
        value: 'nil',
      },
    ],
    hint: '版本号会根据选择的类型递增',
  },
  {
    type: 'toggle',
    name: 'build',
    message: '是否需要构建?',
    initial: true,
    active: '是',
    inactive: '否',
  },
  {
    type: 'toggle',
    name: 'test',
    message: '是否运行单元测试?',
    initial: true,
    active: '是',
    inactive: '否',
  },
  {
    type: 'toggle',
    name: 'git',
    message: '是否生成git发布记录?',
    initial: true,
    active: '是',
    inactive: '否',
  },
  {
    type: 'toggle',
    name: 'confirm',
    message: '请检查以上信息是否准确,点击确认开始发布',
    initial: true,
    active: '确认并发布',
    inactive: '退出',
  },
];

checkGit();

(async () => {
  const response = await prompts(questions);
  const { registry, mode, build, test, git, confirm } = response;

  if (!confirm) {
    process.exit();
  }

  console.log('\n');

  if (build) {
    runBuild();
  }

  if (test) {
    runTest();
  }

  if (mode !== 'nil') {
    runVersion(mode);
  }

  runPublish(registry);

  if (git) {
    runGit();
  }

  console.log('\n发布完成'.cyan);
})();

function checkGit() {
  const branchProcess = spawnSync('git', ['branch']);
  const branch = branchProcess.stdout
    .toString()
    .trim()
    .match(/\* (\S+)/)[1];

  if (branch !== 'master' && branch !== 'release') {
    console.log('只能在 master 或 release 分支进行发布!'.red);
    process.exit();
  }

  const diffProcess = spawnSync('git', ['diff', '--name-only']);
  const diff = diffProcess.stdout.toString().trim();
  const diffCachedProcess = spawnSync('git', ['diff', '--cached', '--name-only']);
  const diffCached = diffCachedProcess.stdout.toString().trim();

  if (diff || diffCached) {
    console.log('有修改尚未提交, 请先执行 git commit!'.red);
    process.exit();
  }
}

function runBuild() {
  console.log('\n执行构建...'.cyan);
  const buildProcess = spawnSync(npm, ['run', 'build', '--colors'], { stdio: 'inherit' });

  if (buildProcess.status === 1) {
    console.log('\n构建失败, 发布停止'.red);
    process.exit();
  }
}

function runTest() {
  console.log('\n执行测试...'.cyan);
  const testProcess = spawnSync(npm, ['run', 'test'], { stdio: 'inherit' });

  if (testProcess.status === 1) {
    console.log('\n测试失败, 发布停止'.red);
    process.exit();
  }
}

function runVersion(mode) {
  console.log('\n修改版本号...'.cyan);
  const versionProcess = spawnSync(npm, ['version', mode, '--no-git-tag-version']);

  if (versionProcess.status === 1) {
    console.log('\n修改版本号失败, 发布停止'.red);
    process.exit();
  }

  newVersion = versionProcess.stdout.toString().trim();
  console.log('版本号修改为: ' + newVersion.cyan);
}

function runPublish(registry) {
  console.log('\n开始发布....'.cyan);
  const args = ['publish'];

  if (registry !== 'nil') {
    args.push(`--registry=${registry}`);
  }

  const publishProcess = spawnSync(npm, args, { stdio: 'inherit' });

  if (publishProcess.status === 1) {
    console.log('\n发布失败'.red);
    process.exit();
  }
}

function runGit() {
  console.log('\n生成git标签并提交....'.cyan);
  const ver = newVersion || `v${version}`;

  spawnSync('git', ['add', '.'], { stdio: 'inherit' });
  spawnSync('git', ['commit', '-m', ver], { stdio: 'inherit' });
  spawnSync('git', ['tag', ver], { stdio: 'inherit' });
  spawnSync('git', ['push', 'origin', ver], { stdio: 'inherit' });
}
