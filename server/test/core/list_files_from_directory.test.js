const subject = require(`${__MR}/core/list_files_from_directory`);

describe('integration: Core/ListFilesFromDirectory', function() {
  it('should grab files & directory names (recursive: false)', function() {
    // call
    results = subject({
        directory: `${__HOME}/test/core/list_files_from_directory`,
        recursive: false
    });

    assert(results.length === 2)
    assert(results[0] === `${__HOME}/test/core/list_files_from_directory/top_level_file.txt`)
    assert(results[1] === `${__HOME}/test/core/list_files_from_directory/top_level_folder`)
  });

  it('should grab all files [no explicit directory names] (recursive: true)', function() {
    // call
    results = subject({
        directory: `${__HOME}/test/core/list_files_from_directory`,
        recursive: true
    });

    assert(results.length === 3)
    assert(results[0] === `${__HOME}/test/core/list_files_from_directory/top_level_file.txt`)
    assert(results[1] === `${__HOME}/test/core/list_files_from_directory/top_level_folder/child_file.txt`)
    assert(results[2] === `${__HOME}/test/core/list_files_from_directory/top_level_folder/child_folder/grandchild.txt`)
  });

  it('should throw an error when no such path exists', function() {
    // call
    try {
      results = subject({
        directory: ``,
        recursive: true
      });
    } catch(e) {
      assert(e.message === 'ENOENT: no such file or directory, scandir')
    }
  });
});
