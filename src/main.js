import "./index.css";

const todoDatas = [
  {
    content_id: "1",
    content: "測試",
    completed_state: false,
  },
];

$(document).ready(function () {
  $("#create-item-form").submit(function (e) {
    e.preventDefault();
    if ($(e.target).find("input").val() === "") return;
    todoDatas.push({
      content_id: new Date().getTime(),
      content: $(e.target).find("input").val(),
      completed_state: false,
    });
    $(e.target).find("input").val("");
    renderItems();
  });
  $("#clear-completed").click(function () {
    removeCompletedItems();
  });
  $('input[type="radio"]').change(function () {
    if ($(this).attr("id") === "active-state") {
      renderItems(todoDatas.filter((data) => !data.completed_state));
    } else if ($(this).attr("id") === "completed-state") {
      renderItems(todoDatas.filter((data) => data.completed_state));
    } else {
      renderItems();
    }
  });
  renderItems();
});

function removeCompletedItems() {
  const result = todoDatas.filter((data) => !data.completed_state);
  todoDatas.splice(0, todoDatas.length);
  todoDatas.push(...result);
  renderItems();
}

function updateItemLeftCount() {
  const result = todoDatas.filter((data) => !data.completed_state);
  $("#items-count").text(result.length);
}

function renderItems(datas = todoDatas) {
  $("#items").empty();
  datas.forEach((data) =>
    renderItem(data.content_id, data.content, data.completed_state)
  );
  updateItemLeftCount();
}

function renderItem(content_id, content, completed_state) {
  const item = $("#todo-list-item").html();
  const node = $(item);
  $(node)
    .find("label")
    .attr("for", "completed-checked-" + content_id);
  $(node)
    .find("input")
    .attr("id", "completed-checked-" + content_id);
  $(node).find("input").prop("checked", completed_state);
  $(node)
    .find("input")
    .change(function () {
      const index = todoDatas.findIndex(
        (data) => content_id === data.content_id
      );
      todoDatas[index].completed_state = !todoDatas[index].completed_state;
      renderItems();
    });
  $(node)
    .find("p")
    .attr("id", "todo-list-item-content-" + content_id)
    .text(content);
  $(node)
    .find("#delete-btn")
    .click(function (e) {
      const index = todoDatas.findIndex(
        (data) => data.content_id === content_id
      );
      todoDatas.splice(index, 1);
      renderItems();
    });
  $("#items").prepend($(node));
}
