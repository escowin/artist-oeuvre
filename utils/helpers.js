module.exports = {
    tag_name_regex: (tag_name) => {
        const regex = /^[a-zA-Z0-9\s\u00C0-\u1FFF\u2C00-\uD7FF\u3040-\u30FF\u3100-\u312F\u4E00-\u9FFF\uAC00-\uD7AF]*$/u;
        if (!regex.test(tag_name)) {
          throw new Error('invalid tag name');
        }
        return true;
      },
    };
    